import * as ko from 'knockout';
import 'styles/main.less';
import 'scripts/components/pages/root';
import {ItemRepo} from 'scripts/repositories/item-repo';

ItemRepo.init();
ko.applyBindings({});
