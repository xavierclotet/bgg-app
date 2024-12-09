import { render, screen} from '@testing-library/angular'
import { userEvent} from '@testing-library/user-event'

import { of, throwError } from 'rxjs';
import { LoginComponent } from './login.component';
import { AuthService } from '@app/services';

describe('LoginComponent', () => {
  let authServiceMock: jest.Mocked<AuthService>;
  
  beforeEach(async () => {
    authServiceMock = {
      login: jest.fn(),
    } as unknown as jest.Mocked<AuthService>;

    delete (window as any).location;
    window.location = { href: '' } as any;
  });

  it('should redirect to dashboard in successfull login', async () => {
    //given
    authServiceMock.login.mockReturnValueOnce(of({token: 'fake-jwt-token'}));
    await render(LoginComponent, {
      providers: [
        { provide: AuthService, useValue: authServiceMock }
      ]
    })
    //when
    await userEvent.type(screen.getByPlaceholderText('Email'), 'user@example.com');
    await userEvent.type(screen.getByPlaceholderText('Password'), 'fake-password');
    await userEvent.click(screen.getByRole('button', { name: /login/i }));

    //then
    expect(authServiceMock.login).toHaveBeenCalledWith('user@example.com', 'fake-password');
    expect(window.location.href).toBe('/dashboard');
  });

  it('should show error message in failed login', async () => {
    //given
    authServiceMock.login.mockReturnValueOnce(throwError(() => ({error: {message: 'Invalid email or password'}})));
    await render(LoginComponent, {
      providers: [
        { provide: AuthService, useValue: authServiceMock }
      ]
    })
    //when
    await userEvent.type(screen.getByPlaceholderText('Email'), 'user@example.com');
    await userEvent.type(screen.getByPlaceholderText('Password'), 'wrong-password');
    await userEvent.click(screen.getByRole('button', { name: /login/i }));

    //then    
    const errorMessage = await screen.findByText('Invalid email or password');
    expect(errorMessage).toBeTruthy();
  });
});