
import {WebService} from './../shared/web.service';
import { HttpModule } from "@angular/http";
import { TestBed, async, inject } from '@angular/core/testing';



describe('WebService', () => {
    let service: WebService;
    

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [ HttpModule,WebService]
        })
    }))

    it('should return  4 tags', async(
        inject([ WebService ], (service: WebService) => {
            service.getTags().map(response => {
                expect(response.length).toBe(4);
            })
        })
    ))
})

