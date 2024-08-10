import useAuth from 'hooks/useAuth';
// material
import { Container } from '@mui/material';
import Layout from 'layouts';
// import { getUserList } from 'redux/slices/user';
// routes
// import HeaderBreadcrumbs from 'components/HeaderBreadcrumbs';
// components
import Page from 'components/Page';
import HeaderBreadcrumbs from 'components/HeaderBreadcrumbs';
import { PATH_PROFILE } from 'routes/paths';
import UserProfileForm from './UserProfileForm';
// ----------------------------------------------------------------------

UserProfile.getLayout = function getLayout(page) {
  return <Layout variant="profile">{page}</Layout>;
};

export default function UserProfile() {

  const { user } = useAuth();
  // const { userList } = useSelector((state) => state.user);
  // const isEdit = pathname.includes('edit');
  // const currentUser = userList.find((user) => paramCase(user.name) === name);

  return (
    <Page title="User Profile">
      <Container maxWidth="lg">
        <HeaderBreadcrumbs
          heading="User Profile"
          links={[
            { name: 'Profile', href: PATH_PROFILE.root },
            { name: 'User', href: PATH_PROFILE.user },
          ]}
        />

        <UserProfileForm currentUser={user} />
      </Container>
    </Page>
  );
}
