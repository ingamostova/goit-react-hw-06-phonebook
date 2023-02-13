import { ContactItem } from 'components/ContactItem/ContactItem';
import { List, ListItem } from './ContactList.styled';
import { useSelector } from 'react-redux';
import { getContacts, getFilter } from 'redux/selectors';

const filterContacts = (items, filter) =>
  items.filter(item => item.name.toLowerCase().includes(filter.toLowerCase()));

export const ContactList = () => {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);

  const visibleContacts = filterContacts(contacts, filter);
  return (
    <List>
      {visibleContacts.map(item => (
        <ListItem key={item.id}>
          <ContactItem contact={item} />
        </ListItem>
      ))}
    </List>
  );
};
