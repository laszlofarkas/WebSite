import { PublishingService } from './publishing.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Publishing, Content } from './publishing';
import { defer } from 'rxjs';

describe('PublishingService', () => {

  let httpClientSpy: {
    get: jasmine.Spy
    put: jasmine.Spy,
    post: jasmine.Spy,
    delete: jasmine.Spy
  };
  let publishingService: PublishingService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj<HttpClient>(['get', 'put', 'post', 'delete']);
    publishingService = new PublishingService(<any>httpClientSpy);
  });

  describe('list method', () => {

    it('should return observable publishing list', () => {
      const expectedPublishing: Publishing[] = [
        new Publishing(),
        new Publishing()
      ];
      httpClientSpy.get.and.returnValue(defer(() => Promise.resolve(expectedPublishing)));

      publishingService.list().subscribe(
        (publishingList: Publishing[]) => {
          expect(publishingList instanceof Array).toBeTruthy('result should be a list');
          expect(publishingList.length).toBe(2, 'result should have 2 element');
          expect(publishingList[0] instanceof Publishing).toBeTruthy('element of the list should be a Publishing');
        },
        () => fail()
      );
      expect(httpClientSpy.get.calls.count()).toBe(1, 'http get should called once');
      expect(httpClientSpy.get.calls.argsFor(0)[0]).toMatch(/publishing$/, 'should call the correct URL');
    });

    it('should return on error http error', () => {
      const errorResponse = new HttpErrorResponse({
        error: 'test error',
        status: 500,
        statusText: 'Internal Server Error'
      });
      httpClientSpy.get.and.returnValue(defer(() => Promise.reject(errorResponse)));

      publishingService.list().subscribe(
        () => fail(),
        (err) => {
          expect(err.message).toContain('500');
        }
      );
    });
  });


  describe('find method', () => {
    it('should return one publishing', () => {
      const expectedPublishing: Publishing = new Publishing();
      const id = '12345';
      httpClientSpy.get.and.returnValue(defer(() => {
        expectedPublishing.id = id;
        return Promise.resolve(expectedPublishing);
      }));

      publishingService.find(id).subscribe(
        (publishing: Publishing) => {
          expect(publishing instanceof Publishing).toBeTruthy('result should be Publishing');
          expect(publishing.id).toBe('12345', 'id of the publishing should be correct');
        },
        () => fail()
      );
      expect(httpClientSpy.get.calls.count()).toBe(1, 'http request should be called once');
      expect(httpClientSpy.get.calls.argsFor(0)[0]).toMatch(/publishing\/12345$/, 'should call the correct URL');
    });

    it('should return error on http error', () => {
      const errorResponse = new HttpErrorResponse({
        error: 'test error',
        status: 500,
        statusText: 'Internal Server Error'
      });
      httpClientSpy.get.and.returnValue(defer(() => Promise.reject(errorResponse)));
      publishingService.list().subscribe(
        () => fail(),
        (err) => {
          expect(err.message).toContain('500');
        }
      );
    });
  });


  describe('create method', () => {
    it('should create publishing', () => {
      const paramPublishing: Publishing = new Publishing();
      paramPublishing.content = new Content();
      paramPublishing.content.message = 'message';
      const id = '12345';
      httpClientSpy.put.and.callFake((url, publishing) => {
        publishing.id = id;
        publishing.content.id = id;
        return defer(() => Promise.resolve(publishing));
      });

      publishingService.create(paramPublishing).subscribe(
        (publishing: Publishing) => {
          expect(publishing instanceof Publishing).toBeTruthy('result should be Publishing');
          expect(publishing.id !== paramPublishing.id).toBeFalsy('should get new ID');
        },
        () => fail()
      );
      expect(httpClientSpy.put.calls.count()).toBe(1, 'http request should be called once');
      expect(httpClientSpy.put.calls.argsFor(0)[0]).toMatch(/publishing$/, 'should call the correct URL');
    });

    it('should return error on http error', () => {
      const paramPublishing: Publishing = new Publishing();
      const errorResponse = new HttpErrorResponse({
        error: 'test error',
        status: 500,
        statusText: 'Internal Server Error'
      });
      httpClientSpy.put.and.returnValue(defer(() => Promise.reject(errorResponse)));
      publishingService.create(paramPublishing).subscribe(
        () => fail(),
        (err) => {
          expect(err.message).toContain('500');
        }
      );
    });
  });


  describe('update method', () => {
    it('should modify publishing', () => {
      const paramPublishing: Publishing = new Publishing();
      paramPublishing.content = new Content();
      paramPublishing.content.message = 'message';
      const id = '12345';
      httpClientSpy.post.and.returnValue(defer(() => Promise.resolve(paramPublishing)));

      publishingService.update(id, paramPublishing).subscribe(
        (publishing: Publishing) => {
          expect(publishing instanceof Publishing).toBeTruthy('result should be Publishing');
          expect(publishing.id !== paramPublishing.id).toBeFalsy('should get new ID');
        },
        () => fail()
      );
      expect(httpClientSpy.post.calls.count()).toBe(1, 'http request should be called once');
      expect(httpClientSpy.post.calls.argsFor(0)[0]).toMatch(/publishing\/12345$/, 'should call the correct URL');
    });

    it('should return error on http error', () => {
      const paramPublishing: Publishing = new Publishing();
      const id = '12345';
      const errorResponse = new HttpErrorResponse({
        error: 'test error',
        status: 500,
        statusText: 'Internal Server Error'
      });
      httpClientSpy.post.and.returnValue(defer(() => Promise.reject(errorResponse)));
      publishingService.update(id, paramPublishing).subscribe(
        () => fail(),
        (err) => {
          expect(err.message).toContain('500');
        }
      );
    });
  });


  describe('delete method', () => {
    it('should delete publishing', () => {
      const id = '12345';
      httpClientSpy.delete.and.returnValue(defer(() => Promise.resolve()));

      publishingService.delete(id).subscribe(
        () => {
          expect(1).toBe(1);
        },
        () => fail()
      );
      expect(httpClientSpy.delete.calls.count()).toBe(1, 'http request should be called once');
      expect(httpClientSpy.delete.calls.argsFor(0)[0]).toMatch(/publishing\/12345$/, 'should call the correct URL');
    });

    it('should return error on http error', () => {
      const id = '12345';
      const errorResponse = new HttpErrorResponse({
        error: 'test error',
        status: 500,
        statusText: 'Internal Server Error'
      });
      httpClientSpy.delete.and.returnValue(defer(() => Promise.reject(errorResponse)));
      publishingService.delete(id).subscribe(
        () => fail(),
        (err) => {
          expect(err.message).toContain('500');
        }
      );
    });
  });

});
