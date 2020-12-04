import { contactsTypes } from "../types/types";
const {
  ADD_CONTACT,
  GET_CONTACT,
  FILTER_CONTACT_LIST,
  PULL_PHONE_CONTACT_LIST,
} = contactsTypes;
import _ from "lodash";

const contactsReducer = (
  state = {
    contactList: [],
  },
  action
) => {
  const getContactWithSection = (contactList) => {
    const createContactListForCharacter = (char, contactList) => {
      let customArray = [];
      let a = contactList.filter((contact) => {
        return contact.name.toLowerCase().startsWith(char);
      });

      return {
        title: char.toUpperCase(),
        data: a,
      };
    };

    const getSectionTitle = (contactList) => {
      const alphabets = contactList.map((contact) => {
        return contact.name.slice(0, 1).toLowerCase();
      });
      return _.uniq(alphabets).sort();
    };

    const sectionTitleAlphabetArray = getSectionTitle(contactList);

    return sectionTitleAlphabetArray.map((letter) => {
      return createContactListForCharacter(letter, contactList);
    });
  };

  const getContactArrayWithFirstLetter = (firstLetter, contactList) => {
    return contactList.filter((contact) => {
      return contact.title.startsWith(firstLetter);
    });
  };

  const getSearchArray = (searchKeyword, contactList) => {
    if (searchKeyword.length > 0) {
      const firstSearchLetter = searchKeyword.slice(0, 1).toUpperCase();
      const sectionArrayAfterFilter = getContactArrayWithFirstLetter(
        firstSearchLetter,
        contactList
      );

      const matchingContact = sectionArrayAfterFilter[0].data.filter(
        (contact) => {
          return contact.name
            .toLowerCase()
            .startsWith(searchKeyword.toLowerCase());
        }
      );

      return [
        {
          data: matchingContact,
          title: sectionArrayAfterFilter[0].title,
        },
      ];
    }
  };

  switch (action.type) {
    case ADD_CONTACT:
      return { ...state, token: action.payload };

    // case GET_CONTACT: {
    //   let contactListWithSection = getContactWithSection(action.payload);

    //   return { ...state, contactList: contactListWithSection };
    // }

    case FILTER_CONTACT_LIST: {
      const contactListAfterFilter = getSearchArray(
        action.payload,
        state.contactList
      );

      return { ...state, contactList: contactListAfterFilter };
    }

    case PULL_PHONE_CONTACT_LIST: {
      // const contactList = getSearchArray(action.payload);

      const contactWithSectionTitle = getContactWithSection(action.payload);

      // console.log("contact with section is", contactWithSectionTitle);

      return { ...state, contactList: contactWithSectionTitle };
    }

    default:
      return state;
  }
};

export default contactsReducer;
