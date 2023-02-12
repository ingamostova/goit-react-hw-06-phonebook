import PropTypes from 'prop-types';
import { ContactItem } from 'components/ContactItem/ContactItem';
import { List, ListItem } from './ContactList.styled';
import { useSelector } from 'react-redux';
import { getContacts } from 'redux/selectors';

export const ContactList = ({ items, onDelete }) => {
  const contacts = useSelector(getContacts);
  return (
    <List>
      {contacts.map(item => (
        <ListItem key={item.id}>
          <ContactItem contact={item} onDelete={onDelete} />
        </ListItem>
      ))}
    </List>
  );
};

ContactList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    })
  ),
  onDelete: PropTypes.func.isRequired,
};
