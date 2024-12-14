import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { useSession } from '../../SessionContext'; // Import context


const LoginPage = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useSession(); // Access the login function from context
  const role = 'student';
  const role2 = 'mess representative';
  const role3 = 'admin';
  const role4 = 'coordinator'
  const handleLogin = () => {
    if (email === 'abcd' && password === '123' && role==='student') {
      console.log('Login successful');
      login({ role }); // Update session context with user data
      // console.log(user.role);
      navigation.navigate('StudentPage');
    } 
    else if(email==='efg' && password==='098' && role2==='mess representative'){
      console.log('Login successful');
      login({ role2 }); // Update session context with user data
      navigation.navigate('MRPage');
    }
    else if(email==='neeraj' && password==='kalki' && role3==='admin'){
      console.log('Login successful');
      login({ role3 }); // Update session context with user data
      navigation.navigate('Admin');
    }
    else if(email==='ram' && password==='ramu' && role4==='coordinator'){
      console.log('Login successful');
      login({ role4 }); // Update session context with user data
      navigation.navigate('Coordinator');
    }
    else {
      alert('Invalid email or password');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <View style={styles.logo}>
          <Image
            source={require('../../../assets/images/rgulogo2.png')}
            style={styles.logoImage}
          />
        </View>
        <Text style={styles.title}>Mess Complaint Management System</Text>
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.heading}>Login</Text>
        <Text style={styles.subtitle}>Sign in to continue</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>
        <View style={styles.linksContainer}>
          <TouchableOpacity onPress={() => alert('Forgot Password functionality not implemented')}>
            <Text style={styles.linkText}>Forgot Password</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.linkText}>Register</Text> {/* Use navigation to go to Register page */}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0f2f1',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  logo: {
    width: 100,
    height: 100,
    backgroundColor: '#1E7C2F',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  logoImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  title: {
    color: '#1E7C2F',
    fontSize: 24,
    marginBottom: 10,
  },
  formContainer: {
    padding: 20,
    alignItems: 'center',
  },
  heading: {
    color: '#1E7C2F',
    fontSize: 30,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#1E7C2F',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#1E7C2F',
    padding: 15,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  linksContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  linkText: {
    color: '#1E7C2F',
    textDecorationLine: 'underline',
  },
});

export default LoginPage;
