import {Auth, Hub} from 'aws-amplify';
import {createContext, useState, useContext, useEffect} from 'react';

export const AuthConext = createContext({
  user: {},
  userId: '',
});

const AuthContextProvider = ({children}) => {
  const [user, setUser] = useState(null);

  const checkUser = async () => {
    try {
      const authUser = await Auth.currentAuthenticatedUser({
        bypassCache: true,
      });

      setUser(authUser);
    } catch (e) {
      setUser('');
    }
  };
  useEffect(() => {
    checkUser();
  }, []);

  useEffect(() => {
    const listener = data => {
      const {event} = data?.payload;
      if (event === 'signOut') {
        setUser(null);
      }
      if (event === 'signIn') {
        checkUser();
      }
    };
    Hub.listen('auth', listener);
    return () => Hub.remove('auth', listener);
  }, []);

  return (
    <AuthConext.Provider value={{user, userId: user?.attributes?.sub}}>
      {children}
    </AuthConext.Provider>
  );
};

export default AuthContextProvider;

export const useAuthContext = () => useContext(AuthConext);
