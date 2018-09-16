/*!
 * @license
 * Alfresco Example Content Application
 *
 * Copyright (C) 2005 - 2018 Alfresco Software Limited
 *
 * This file is part of the Alfresco Example Content Application.
 * If the software was purchased under a paid Alfresco license, the terms of
 * the paid license agreement will prevail.  Otherwise, the software is
 * provided under the following open source license terms:
 *
 * The Alfresco Example Content Application is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * The Alfresco Example Content Application is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with Alfresco. If not, see <http://www.gnu.org/licenses/>.
 */

import { Routes } from '@angular/router';
import { AuthGuardEcm } from '@alfresco/adf-core';
import { SharedLinkViewComponent } from './components/shared-link-view/shared-link-view.component';

import { LayoutComponent } from './components/layout/layout.component';

import { FilesComponent } from './components/files/files.component';
import { LibrariesComponent } from './components/libraries/libraries.component';
import { SharedFilesComponent } from './components/shared-files/shared-files.component';

import { GenericErrorComponent } from './components/common/generic-error/generic-error.component';
import { SearchResultsComponent } from './components/search/search-results/search-results.component';

import { ProfileResolver } from './services/profile.resolver';

export const APP_ROUTES: Routes = [
  {
    path: 'login',
    loadChildren: 'src/app/components/login/login.module#AppLoginModule'
  },
  {
    path: 'settings',
    loadChildren:
      'src/app/components/settings/settings.module#AppSettingsModule'
  },
  {
    path: 'preview/s/:id',
    component: SharedLinkViewComponent,
    data: {
      title: 'APP.PREVIEW.TITLE'
    }
  },
  {
    path: '',
    component: LayoutComponent,
    resolve: { profile: ProfileResolver },
    children: [
      {
        path: '',
        redirectTo: `/personal-files`,
        pathMatch: 'full'
      },
      {
        path: 'favorites',
        children: [
          {
            path: '',
            loadChildren:
              'src/app/components/favorites/favorites.module#AppFavoritesModule'
          },
          {
            path: 'preview/:nodeId',
            loadChildren:
              'src/app/components/preview/preview.module#PreviewModule',
            data: {
              title: 'APP.PREVIEW.TITLE',
              navigateMultiple: true,
              navigateSource: 'favorites'
            }
          }
        ]
      },
      {
        path: 'libraries',
        children: [
          {
            path: '',
            component: LibrariesComponent,
            data: {
              title: 'APP.BROWSE.LIBRARIES.TITLE',
              sortingPreferenceKey: 'libraries'
            }
          },
          {
            path: ':folderId',
            component: FilesComponent,
            data: {
              title: 'APP.BROWSE.LIBRARIES.TITLE',
              sortingPreferenceKey: 'libraries-files'
            }
          },
          {
            path: ':folderId/preview/:nodeId',
            loadChildren:
              'src/app/components/preview/preview.module#PreviewModule',
            data: {
              title: 'APP.PREVIEW.TITLE',
              navigateMultiple: true,
              navigateSource: 'libraries'
            }
          }
        ]
      },
      {
        path: 'personal-files',
        data: {
          sortingPreferenceKey: 'personal-files'
        },
        children: [
          {
            path: '',
            component: FilesComponent,
            data: {
              title: 'APP.BROWSE.PERSONAL.TITLE',
              defaultNodeId: '-my-'
            }
          },
          {
            path: ':folderId',
            component: FilesComponent,
            data: {
              title: 'APP.BROWSE.PERSONAL.TITLE'
            }
          },
          {
            path: 'preview/:nodeId',
            loadChildren:
              'src/app/components/preview/preview.module#PreviewModule',
            data: {
              title: 'APP.PREVIEW.TITLE',
              navigateMultiple: true,
              navigateSource: 'personal-files'
            }
          },
          {
            path: ':folderId/preview/:nodeId',
            loadChildren:
              'src/app/components/preview/preview.module#PreviewModule',
            data: {
              title: 'APP.PREVIEW.TITLE',
              navigateMultiple: true,
              navigateSource: 'personal-files'
            }
          }
        ]
      },
      {
        path: 'recent-files',
        data: {
          sortingPreferenceKey: 'recent-files'
        },
        children: [
          {
            path: '',
            loadChildren:
              'src/app/components/recent-files/recent-files.module#AppRecentFilesModule'
          },
          {
            path: 'preview/:nodeId',
            loadChildren:
              'src/app/components/preview/preview.module#PreviewModule',
            data: {
              title: 'APP.PREVIEW.TITLE',
              navigateMultiple: true,
              navigateSource: 'recent-files'
            }
          }
        ]
      },
      {
        path: 'shared',
        data: {
          sortingPreferenceKey: 'shared-files'
        },
        children: [
          {
            path: '',
            component: SharedFilesComponent,
            data: {
              title: 'APP.BROWSE.SHARED.TITLE'
            }
          },
          {
            path: 'preview/:nodeId',
            loadChildren:
              'src/app/components/preview/preview.module#PreviewModule',
            data: {
              title: 'APP.PREVIEW.TITLE',
              navigateMultiple: true,
              navigateSource: 'shared'
            }
          }
        ]
      },
      {
        path: 'trashcan',
        loadChildren:
          'src/app/components/trashcan/trashcan.module#AppTrashcanModule'
      },
      {
        path: 'about',
        loadChildren: 'src/app/components/about/about.module#AboutModule'
      },
      {
        path: 'search',
        children: [
          {
            path: '',
            component: SearchResultsComponent,
            data: {
              title: 'APP.BROWSE.SEARCH.TITLE',
              reuse: true
            }
          },
          {
            path: 'preview/:nodeId',
            loadChildren:
              'src/app/components/preview/preview.module#PreviewModule',
            data: {
              title: 'APP.PREVIEW.TITLE',
              navigateMultiple: true,
              navigateSource: 'search'
            }
          }
        ]
      },
      {
        path: '**',
        component: GenericErrorComponent
      }
    ],
    canActivateChild: [AuthGuardEcm],
    canActivate: [AuthGuardEcm]
  }
];
