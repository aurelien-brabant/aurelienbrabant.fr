import { NextPage } from 'next/types';
import ErrorPage from '../components/ErrorPage';

const NotFound: NextPage = () => (
    <ErrorPage statusCode={500} sub={{fr: 'Erreur interne (c\'est pas bon :p)', en: 'Internal error (that\'s not great)'}} />
)

export default NotFound;
