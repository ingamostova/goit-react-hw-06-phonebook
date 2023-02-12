import PropTypes from 'prop-types';
import { Formik, ErrorMessage } from 'formik';
import * as yup from 'yup';
import 'yup-phone';
import { Forma, Input, Label, Error, Btn } from './ContactForm.styled';
import { useDispatch } from 'react-redux';
import { addContact } from 'redux/contactsSlice';

const schema = yup.object().shape({
  name: yup.string().min(3, 'Too short!').required(),
  number: yup.string().phone().required(),
});

const initialValues = {
  name: '',
  number: '',
};

export const ContactForm = ({ onSubmit }) => {
  const dispatch = useDispatch();

  const handleSubmit = (values, { resetForm }) => {
    const { name, number } = values;
    dispatch(addContact(name, number));
    // onSubmit(name, number);
    resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      <Forma autoComplete="off">
        <Label htmlFor="name">
          Name
          <Input type="text" name="name" />
          <ErrorMessage name="name" render={msg => <Error>{msg}</Error>} />
        </Label>
        <Label htmlFor="number">
          Number
          <Input type="tel" name="number" />
          <ErrorMessage name="number" render={msg => <Error>{msg}</Error>} />
        </Label>
        <Btn type="submit">Add contact</Btn>
      </Forma>
    </Formik>
  );
};

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
