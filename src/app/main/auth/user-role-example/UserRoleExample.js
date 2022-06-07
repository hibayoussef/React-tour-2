import FuseHighlight from "@fuse/core/FuseHighlight";
import FusePageSimple from "@fuse/core/FusePageSimple";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  layoutRoot: {},
}));

function UserRoleExample() {
  const classes = useStyles();

  return (
    <FusePageSimple
      classes={{
        root: classes.layoutRoot,
      }}
      header={
        <div className="p-24 flex items-center">
          <Typography className="h2">user: Auth role example page</Typography>
        </div>
      }
      content={
        <div className="p-24">
          <Typography className="mb-24">
            You can see this page because you have not logged in. Otherwise you
            should be redirected to root page.
          </Typography>

          <Typography className="mb-24">
            This is the page's config file:
          </Typography>

          <FuseHighlight component="pre" className="language-js">
            {`
                            import {authRoles} from 'auth';
                            import UserRoleExample from 'app/main/auth/user-role-example/UserRoleExample';

                            export const UserRoleExampleConfig = {
                                settings: {
                                    layout: {
                                        config: {}
                                    }
                                },
                                auth    : authRoles.user,//['user']
                                routes  : [
                                    {
                                        path     : '/auth/user-role-example',
                                        component: UserRoleExample
                                    }
                                ]
                            };
                            `}
          </FuseHighlight>

          <Typography className="my-24">
            You can also hide the navigation item/collapse/group with user roles
            by giving auth property.
          </Typography>

          <FuseHighlight component="pre" className="language-json">
            {`
                                export const fuseNavigationConfig = [
                                  {
                                    id: "only-user-navigation-item",
                                    title: "Nav item only for Guest",
                                    type: "item",
                                    auth: authRoles.user,
                                    url: "/auth/user-role-example",
                                    icon: "verified_user",
                                  },
                                ];
                            `}
          </FuseHighlight>
        </div>
      }
    />
  );
}

export default UserRoleExample;
