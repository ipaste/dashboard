// Copyright 2015 Google Inc. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {stateName as chromeStateName} from 'chrome/chrome_state';
import {breadcrumbsConfig} from 'common/components/breadcrumbs/breadcrumbs_service';
import {stateName as workloadsStateName} from 'workloads/workloads_state';

import {PodListController} from './podlist_controller';
import {stateName, stateUrl} from './podlist_state';

/**
 * Configures states for the service view.
 *
 * @param {!ui.router.$stateProvider} $stateProvider
 * @ngInject
 */
export default function stateConfig($stateProvider) {
  $stateProvider.state(stateName, {
    url: stateUrl,
    parent: chromeStateName,
    resolve: {
      'podList': resolvePodList,
    },
    data: {
      [breadcrumbsConfig]: {
        'label': i18n.MSG_BREADCRUMBS_PODS_LABEL,
        'parent': workloadsStateName,
      },
    },
    views: {
      '': {
        controller: PodListController,
        controllerAs: '$ctrl',
        templateUrl: 'podlist/podlist.html',
      },
    },
  });
}

/**
 * @param {!angular.Resource} kdPodListResource
 * @param {!./../chrome/chrome_state.StateParams} $stateParams
 * @param {!./../common/pagination/pagination_service.PaginationService} kdPaginationService
 * @return {!angular.$q.Promise}
 * @ngInject
 */
export function resolvePodList(kdPodListResource, $stateParams, kdPaginationService) {
  let paginationQuery = kdPaginationService.getDefaultResourceQuery($stateParams.namespace);
  return kdPodListResource.get(paginationQuery).$promise;
}

const i18n = {
  /** @type {string} @desc Label 'Pods' that appears as a breadcrumbs on the action bar. */
  MSG_BREADCRUMBS_PODS_LABEL: goog.getMsg('Pods'),
};
