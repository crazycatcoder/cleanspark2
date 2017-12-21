


import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
//import {AppModule}  from './app.module'

import { AppComponent } from './app.component';
import { WebService }  from './shared/web.service';



import { APP_BASE_HREF } from '@angular/common';

describe('AppComponent', () => {
    let component: ComponentFixture<AppComponent>;
    let element: DebugElement;
    let html: HTMLElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ BrowserModule, FormsModule, HttpModule ],
            declarations: [ AppComponent, WebService ],
            providers: [
                { provide: APP_BASE_HREF, useValue: '/' }
            ]
        })

        component = TestBed.createComponent(AppComponent);
    })

    it('should contain title', () => {
        let title = 'App Running';

        component.detectChanges();
        element = component.debugElement.query(By.css('h2'));
        html = element.nativeElement;

        expect(html.innerText).toBe(title);
    })
})

