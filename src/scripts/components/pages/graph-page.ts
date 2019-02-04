import * as ko from 'knockout';
import * as _ from 'lodash';
import * as vis from 'vis';
import {WebsitesRepo} from 'scripts/repositories/websites-repo';
import {Website} from 'scripts/models/website';

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
        layout: {
            improvedLayout: false
        },
        physics: {
            enabled: true,
            barnesHut: {
                gravitationalConstant: -2000,
                centralGravity: 0.3,
                springLength: 95,
                springConstant: 0.04,
                damping: 0.09,
                avoidOverlap: 0.1
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
                nodeDistance: 100,
                damping: 0.09
            },
            hierarchicalRepulsion: {
                centralGravity: 0.0,
                springLength: 100,
                springConstant: 0.01,
                nodeDistance: 120,
                damping: 0.09
            },
            maxVelocity: 50,
            minVelocity: 0.1,
            solver: 'barnesHut',
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

    private uniqueWebsiteToWebsites = ko.pureComputed(() => {
        const unique = _.uniqWith(this.websiteToWebsites(), _.isEqual)
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
            this.nodes.add({
                id: website.websiteId,
                label: website.url,
                shape: 'dot',
                size: Math.log(this.websiteInDegree(website) + this.websiteOutDegree(website)) * 10
            })
        });
    }

    private populateEdgeSet(): void {
        this.edges.add(this.uniqueWebsiteToWebsites());
    }

    private websiteInDegree(website: Website) {
        return _.filter(this.uniqueWebsiteToWebsites(), (wtw: any) => wtw.to === website.websiteId).length;
    }

    private websiteOutDegree(website: Website) {
        return _.filter(this.uniqueWebsiteToWebsites(), (wtw: any) => wtw.from === website.websiteId).length;
    }
}

ko.components.register('graph-page', {
    template: template,
    viewModel: ViewModel
});
