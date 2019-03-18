import * as ko from 'knockout';
import 'styles/main.less';
import 'scripts/components/pages/root';
import 'scripts/bindings/bindings-loader';
import {ItemRepo} from 'scripts/repositories/item-repo';
import {StatisticsRepo} from 'scripts/repositories/statistics-repo';
import {WebsitesRepo} from 'scripts/repositories/websites-repo';
import {SimilarityRepo} from 'scripts/repositories/similarity-repo';

ItemRepo.init();
StatisticsRepo.init();
WebsitesRepo.init();
SimilarityRepo.init();
ko.applyBindings({});
