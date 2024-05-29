import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { AuthService } from "./services/auth.service";

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeDefined();
  });

  it('should login a user', () => {
    const mockResponse = { token: '12345' };
    const credentials = { email: 'test@example.com', password: 'password' };

    service.login(credentials).subscribe(response => {
      expect(response.token).toEqual(mockResponse.token);
    });

    const req = httpMock.expectOne('http://localhost:3000/auth/login');
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should register a user', () => {
    const mockResponse = { message: 'User registered successfully' };
    const user = { email: 'test@example.com', password: 'password', name: 'Test User' };

    service.register(user).subscribe(response => {
      expect(response.message).toEqual(mockResponse.message);
    });

    const req = httpMock.expectOne('http://localhost:3000/auth/register');
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  afterEach(() => {
    httpMock.verify();
  });
});
