export default class IDP {
    provide({ access_token, profile }: {
        access_token: string;
        profile: any;
    }): Promise<any>;
}
