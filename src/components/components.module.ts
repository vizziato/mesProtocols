import { NgModule } from '@angular/core';
import { FooterComponent } from './footer/footer';
import { HeaderComponent } from './header/header';
@NgModule({
	declarations: [FooterComponent,
    HeaderComponent],
	imports: [],
	exports: [FooterComponent,
    HeaderComponent]
})
export class ComponentsModule {}
