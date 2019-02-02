import * as ko from 'knockout';
import 'styles/main.less';
import 'scripts/components/pages/root';
import {ItemRepo} from 'scripts/repositories/item-repo';
import {StatisticsRepo} from 'scripts/repositories/statistics-repo';
import {WebsitesRepo} from 'scripts/repositories/websites-repo';

ItemRepo.init();
StatisticsRepo.init();
WebsitesRepo.init();
ko.applyBindings({});
