import 'match-media-mock';

import { renderWithTheme } from '../../../../utils/tests/helpers';

import { Review } from './Review';

import reviews from './mock';

const props = reviews;

describe('<Review />', () => {
  it('Deve renderizar o componente <Review />', () => {
    //Arrange
    const { container } = renderWithTheme(<Review reviews={props} />);
    //Assert
    expect(container.firstChild).toMatchSnapshot();
  });
});
