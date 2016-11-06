import { UltimaCliPage } from './app.po';

describe('ultima-cli App', function() {
  let page: UltimaCliPage;

  beforeEach(() => {
    page = new UltimaCliPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
