import { WalnovPage } from './app.po';

describe('walnov App', () => {
  let page: WalnovPage;

  beforeEach(() => {
    page = new WalnovPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
