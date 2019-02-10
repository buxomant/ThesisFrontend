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

    private nodes = new vis.DataSet([]);
    private edges = new vis.DataSet([]);
    public data = {
        nodes: this.nodes,
        edges: this.edges
    };
    public options = {
        edges: {
            smooth: {
                type: 'cubicBezier',
                forceDirection: 'none'
            }
        },
        nodes: {
            scaling: {
                label: {
                    enabled: true,
                    min: 8,
                    max: 20
                }
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
                springLength: 100,
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
            solver: 'forceAtlas2Based',
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

    private uniqueWebsiteToWebsitesExcludingLoops = ko.pureComputed(() => {
        const unique = _.uniqWith(this.websiteToWebsites(), _.isEqual);
        return _.filter(unique, (wtw: any) => wtw.from !== wtw.to);
    });

    constructor() {
        this.populateNodeSet();
        this.populateEdgeSet();
        console.log(this.data);
        this.domesticNewsWebsites.subscribe(() => this.populateNodeSet());
        this.websiteToWebsites.subscribe(() => this.populateEdgeSet());
    }

    private populateNodeSet(): void {
        _.forEach(this.domesticNewsWebsites(), (website: Website) => {
            if (website.type() !== WebsiteType.INDEXING_SERVICE) {
                const edgeSum = Math.log(this.websiteInDegree(website) + this.websiteOutDegree(website));
                this.nodes.add({
                    id: website.websiteId,
                    label: website.url,
                    shape: 'dot',
                    color: {
                        background: ViewModel.getBackgroundColourForWebsite(website)
                    },
                    size: edgeSum * 10 + 5,
                    font: {
                        size: edgeSum * 5 + 10
                    }
                })
            }
        });
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

    private populateEdgeSet(): void {
        _.forEach(this.uniqueWebsiteToWebsitesExcludingLoops(), (wtw: any) => {
            this.edges.add({
                from: wtw.from,
                to: wtw.to,
                value: this.edgeDegree(wtw)
            });
        });
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
}

ko.components.register('graph-page', {
    template: template,
    viewModel: ViewModel
});
