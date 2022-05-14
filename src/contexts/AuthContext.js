import {Auth, Hub} from 'aws-amplify';
import {createContext, useState, useContext, useEffect} from 'react';

export const AuthConext = createContext({
  user: {},
  setUser: () => {},
});

const AuthContextProvider = ({children}) => {
  const [user, setUser] = useState('undefined');
  console.log('🚀 ~ user', user);

  useEffect(() => {
    (async function () {
      try {
        const authUser = await Auth.currentAuthenticatedUser({
          bypassCache: true,
        });

        setUser(authUser);
      } catch (e) {
        setUser(null);
      }
    })();
  }, []);

  useEffect(() => {
    const listener = data => {
      const {event} = data?.payload;
      if (event === 'signOut') {
        setUser(null);
      }
    };
    Hub.listen('auth', listener);
    return () => Hub.remove('auth', listener);
  }, []);

  return (
    <AuthConext.Provider value={{user, setUser}}>
      {children}
    </AuthConext.Provider>
  );
};

export default AuthContextProvider;

export const useAuthContext = () => useContext(AuthConext);
