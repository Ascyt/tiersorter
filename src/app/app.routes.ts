import { Routes } from '@angular/router';
import { RedirectGuard } from './redirect.guard';
import { NotFoundComponent } from './not-found/not-found.component';
import { RedirectingComponent } from './redirecting/redirecting.component';
import { MainComponent } from './main/main.component';
import { WarnComponent } from './warn/warn.component';

export const routes: Routes = [
    {path: '', redirectTo: '/warn', pathMatch: 'full'},
    {path: 'warn', component: WarnComponent},
    {path: 'main', component: MainComponent},
    {path: 'source', component: RedirectingComponent, canActivate: [RedirectGuard], data: {externalUrl: 'https://github.com/Ascyt/tiersorter'}},
    {path: 'src', redirectTo: '/source', pathMatch: 'full'},
    {path: '**', component: NotFoundComponent}
];
