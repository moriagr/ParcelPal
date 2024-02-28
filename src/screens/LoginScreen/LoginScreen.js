// LoginScreen.js
import React, { useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useUserContext } from '../../common/context/UserContext';
import { Formik } from 'formik';
import { loginValidationScheme } from '../../components/Schemes/LoginRegistrationSchemes';
import { loginUser } from './LoginController';
import PasswordField from '../../components/PassswordField';
import styles from './styles';

export default function LoginScreen({ navigation, route }) {
  const { setUser, driversCount, clientsCount, totalDeliveries } = useUserContext();
  const [loading, setLoading] = useState(false);

  const onFooterLinkPress = () => {
    navigation.navigate('Registration', { role: route.params.role });
  }

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: '100%' }}
        keyboardShouldPersistTaps="always">
        <Image
          style={styles.logo}
          source={require('../../../assets/ParcelPal.png')}
        />
        <Text style={styles.headline}>Join {route.params.role === 'Client' ? `${clientsCount} clients with over ${totalDeliveries} successful deliveries` : `${driversCount} drivers with over ${totalDeliveries} successful deliveries`}</Text>

        <Image
          style={styles.img}
          source={route.params.role === 'Client' ? require('../../../assets/client.png') : require('../../../assets/driver.png')}
        />
        <Formik
          validationSchema={loginValidationScheme}
          initialValues={{
            email: '',
            password: ''
          }}
          onSubmit={(values) => loginUser(values, route.params.role, setLoading, setUser, navigation, clientsCount, driversCount, totalDeliveries)}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, isValid }) => (

            <>
              <TextInput
                style={styles.input}
                placeholderTextColor="#aaaaaa"
                placeholder="Email"
                underlineColorAndroid="transparent"
                autoCapitalize="none"
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
              />
              {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

              <PasswordField styles={styles} name="password" title="Password" value={values.password} handleChange={handleChange} handleBlur={handleBlur} errors={errors} />

              <TouchableOpacity
                style={isValid ? styles.button : styles.disableButton}
                disabled={!isValid}
                onPress={handleSubmit}>
                <Text style={styles.buttonTitle}>{route.params.role} Log in {loading ? ". . ." : ""}</Text>
              </TouchableOpacity>
            </>)}
        </Formik>
        <View style={styles.footerView}>
          <Text style={styles.footerText}>Don't have an account? <Text onPress={onFooterLinkPress} style={styles.footerLink}>Sign up</Text></Text>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}
