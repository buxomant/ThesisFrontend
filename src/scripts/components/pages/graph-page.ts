import * as ko from 'knockout';
import * as _ from 'lodash';
import * as vis from 'vis';
import {WebsitesRepo} from 'scripts/repositories/websites-repo';
import {Website} from 'scripts/models/website';
import {WebsiteContentType, WebsiteType} from 'scripts/models/response/website-response';

const template = require('scripts/components/pages/graph-page.html');

export class ViewModel {
    private domesticNewsWebsites = WebsitesRepo.domesticNewsWebsites;
    private websiteToWebsites = WebsitesRepo.websiteToWebsites;

    private allNodes = ko.observableArray([]);
    private selectedNodes = new vis.DataSet([]);

    private edges = new vis.DataSet([]);
    public data: KnockoutObservable<any> = ko.observable();

    constructor() {
        this.populate();
        console.log(this.data());
        this.domesticNewsWebsites.subscribe(() => this.populate());
        this.websiteToWebsites.subscribe(() => this.populate());
    }

    public nodeData = ko.pureComputed(() => {
        return _.orderBy(this.allNodes(), 'degree', 'desc');
    });

    public isNodeSelected = (node) => {
        return this.selectedNodes.getIds().find((id) => id === node.id);
    };

    public toggleNodeSelected = (node) => {
        const nodeId = this.isNodeSelected(node);
        if (nodeId) {
            this.selectedNodes.remove(nodeId);
        } else {
            this.selectedNodes.add(node);
        }
    };

    public shouldHideGraphConfig = ko.observable(true);

    public toggleGraphConfig() {
        this.shouldHideGraphConfig(!this.shouldHideGraphConfig());
    }

    private uniqueWebsiteToWebsitesExcludingLoops = ko.pureComputed(() => {
        const unique = _.uniqWith(this.websiteToWebsites(), _.isEqual);
        return _.filter(unique, (wtw: any) => wtw.from !== wtw.to);
    });

    private populate(): void {
        if (this.selectedNodes.length === 0 || this.edges.length === 0) {
            this.populateNodeSet();
            this.populateEdgeSet();
            this.data({
                nodes: this.selectedNodes,
                edges: this.edges
            });
        }
    }

    private populateNodeSet(): void {
        _.forEach(this.domesticNewsWebsites(), (website: Website) => {
            if (website.type() !== WebsiteType.INDEXING_SERVICE) {
                const edgeSum = this.websiteInDegree(website) + this.websiteOutDegree(website);
                const edgeSumLog = Math.log(edgeSum);
                this.allNodes.push({
                    id: website.websiteId,
                    label: website.url,
                    shape: 'dot',
                    color: {
                        background: ViewModel.getBackgroundColourForWebsite(website)
                    },
                    degree: edgeSum,
                    size: edgeSumLog * 10 + 5,
                    font: {
                        size: edgeSumLog * 5 + 10
                    }
                })
            }
        });
    }

    private populateEdgeSet(): void {
        const edges = _(this.uniqueWebsiteToWebsitesExcludingLoops())
            .map((wtw: any) => {
                return {
                    from: wtw.from,
                    to: wtw.to,
                    value: this.edgeDegree(wtw)
                };
            }).sortBy('value').value();
        this.edges.add(edges);
    }

    private static getBackgroundColourForWebsite(website: Website) {
        switch (website.contentType()) {
            case WebsiteContentType.NEWS:
                return '#58D68D';
            case WebsiteContentType.SOCIAL_MEDIA:
                return '#F1C40F';
            default:
                return null;
        }
    }

    private edgeDegree(edge: any) {
        return _.filter(this.websiteToWebsites(), (wtw: any) => wtw.to === edge.to && wtw.from === edge.to).length;
    }

    private websiteInDegree(website: Website) {
        return _.filter(this.uniqueWebsiteToWebsitesExcludingLoops(), (wtw: any) => wtw.to === website.websiteId).length;
    }

    private websiteOutDegree(website: Website) {
        return _.filter(this.uniqueWebsiteToWebsitesExcludingLoops(), (wtw: any) => wtw.from === website.websiteId).length;
    }

    public options = {
        configure: {
            enabled: true,
            showButton: true
        },
        edges: {
            smooth: {
                type: 'cubicBezier',
                forceDirection: 'none'
            }
        },
        nodes: {
            borderWidth: 0,
            scaling: {
                label: {
                    enabled: true,
                    min: 8,
                    max: 20
                }
            },
            font: {
                strokeWidth: 15
            }
        },
        layout: {
            improvedLayout: false
        },
        physics: {
            enabled: true,
            barnesHut: {
                gravitationalConstant: -2000,
                centralGravity: 0.3,
                springLength: 500,
                springConstant: 0.04,
                damping: 0.09,
                avoidOverlap: 0
            },
            forceAtlas2Based: {
                gravitationalConstant: -50,
                centralGravity: 0.01,
                springConstant: 0.08,
                springLength: 200,
                damping: 0.4,
                avoidOverlap: 0
            },
            repulsion: {
                centralGravity: 0.2,
                springLength: 200,
                springConstant: 0.05,
                nodeDistance: 500,
                damping: 0.09
            },
            hierarchicalRepulsion: {
                centralGravity: 0.2,
                springLength: 500,
                springConstant: 0.01,
                nodeDistance: 240,
                damping: 0.09
            },
            maxVelocity: 50,
            minVelocity: 0.1,
            solver: 'hierarchicalRepulsion',
            stabilization: {
                enabled: false,
                iterations: 1000,
                updateInterval: 100,
                onlyDynamicEdges: false,
                fit: true
            },
            timestep: 0.5,
            adaptiveTimestep: true
        }
    };
}

ko.components.register('graph-page', {
    template: template,
    viewModel: ViewModel
});
