import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { firstValueFrom } from 'rxjs';

// we use: given (mocks), when, then
 
describe('AuthServiceService', () => {
  let service: AuthService;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withFetch()),
        provideHttpClientTesting(),
        AuthService
      ]
    });
    service = TestBed.inject(AuthService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify(); // verifica que no haya peticiones pendientes
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should do login correctly', async () => {
    const mockResponse = { token: 'fake-jwt-token' };

    const login$ = service.login('user@example.com', 'fake-password');
    const promise = firstValueFrom(login$);
    const req = httpTesting.expectOne('/api/auth/login');

    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ 
      email: 'user@example.com', 
      password: 'fake-password' }
    );

    req.flush(mockResponse); //simulamos respuesta exitosa de backend
    expect(await promise).toEqual(mockResponse);
  })
});
