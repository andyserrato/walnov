export class AppConfig {
    public readonly apiUrl = 'http:localhost:3000';
    public readonly API_VERSION = 'apiv1';
    public readonly USERS_ENDPOINT = this.API_VERSION + '/' + 'users';
    public readonly USERS_AUTH_ENDPOINT = this.API_VERSION + '/users/auth';
}
