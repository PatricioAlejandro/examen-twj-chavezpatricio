import { FrontBorracheraPage } from './app.po';

describe('front-borrachera App', () => {
  let page: FrontBorracheraPage;

  beforeEach(() => {
    page = new FrontBorracheraPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
