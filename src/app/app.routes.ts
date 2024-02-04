import { Routes } from '@angular/router';
import { RedirectGuard } from './redirect.guard';
import { NotFoundComponent } from './not-found/not-found.component';
import { RedirectingComponent } from './redirecting/redirecting.component';
import { InitializeComponent } from './initialize/initialize.component';

export const routes: Routes = [
    {path: '', redirectTo: '/main', pathMatch: 'full'},
    {path: 'main', component: InitializeComponent},
    {path: 'source', component: RedirectingComponent, canActivate: [RedirectGuard], data: {externalUrl: 'https://github.com/Ascyt/tiersorter'}},
    {path: 'src', redirectTo: '/source', pathMatch: 'full'},
    {path: '**', component: NotFoundComponent}
];
