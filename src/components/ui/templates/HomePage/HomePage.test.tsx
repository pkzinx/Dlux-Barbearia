import 'match-media-mock';

import { renderWithTheme } from '../../../../utils/tests/helpers';

import Home from './HomePage';

describe('<Home />', () => {
  it('Deve renderizar o componente <Home />', () => {
    const { container } = renderWithTheme(<Home />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
