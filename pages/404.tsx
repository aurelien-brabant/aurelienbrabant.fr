import { NextPage } from 'next/types';
import ErrorPage from '../components/ErrorPage';

const NotFound: NextPage = () => (
    <ErrorPage statusCode={404} sub={{fr: 'Introuvable', en: 'Not found'}} />
)

export default NotFound;
