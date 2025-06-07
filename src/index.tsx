import * as React from 'react';
import { Link } from 'react-router-dom';
import type { PiletApi } from '@hive/esm-shell-app';

const Page = React.lazy(() => import('./Page'));

export function setup(app: PiletApi) {
  app.registerPage('/page', Page);
  app.registerMenu(() => <Link to="/page">Page</Link>);
}
