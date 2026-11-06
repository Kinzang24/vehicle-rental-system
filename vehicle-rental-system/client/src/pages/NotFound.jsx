import { Link } from 'react-router-dom';
import PageTitle from '../components/common/PageTitle.jsx';

function NotFound() {
  return (
    <>
      <PageTitle title="Page not found" subtitle="The address you opened does not exist in this application." />
      <p><Link to="/">Go back to the dashboard</Link></p>
    </>
  );
}

export default NotFound;
