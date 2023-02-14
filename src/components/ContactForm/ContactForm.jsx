import { Formik, ErrorMessage } from 'formik';
import * as yup from 'yup';
import 'yup-phone';
import { nanoid } from 'nanoid';
import { Forma, Input, Label, Error, Btn } from './ContactForm.styled';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'redux/contactsSlice';
import { getContacts } from 'redux/selectors';

const schema = yup.object().shape({
  name: yup.string().min(3, 'Too short!').required(),
  number: yup.string().phone().required(),
});

const initialValues = {
  name: '',
  number: '',
};

export const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);

  const handleSubmit = (values, { resetForm }) => {
    const { name, number } = values;
    if (
      contacts.find(
        contact => contact.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      alert(`${name} is already in contacts`);
      return;
    }
    const contactItem = {
      id: nanoid(),
      name,
      number,
    };
    dispatch(addContact(contactItem));
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
