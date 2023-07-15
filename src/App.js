import React from 'react';
import { useState } from 'react';
const initialFriends = [
  {
    id: 118836,
    name: 'Clark',
    image: 'https://i.pravatar.cc/48?u=118836',
    balance: -7,
  },
  {
    id: 933372,
    name: 'Sarah',
    image: 'https://i.pravatar.cc/48?u=933372',
    balance: 20,
  },
  {
    id: 499476,
    name: 'Anthony',
    image: 'https://i.pravatar.cc/48?u=499476',
    balance: 0,
  },
];

export default function App() {
  const [friends, setFriends] = useState(initialFriends);
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [selectFriend, setSelectedFriend] = useState(null);

  function handleShowFriend() {
    // setShowAddFriend(!showAddFriend);
    setShowAddFriend((show) => !show);
  }

  function handleAddFriend(friend) {
    setFriends((friends) => [...friends, friend]);
    setShowAddFriend(false);
  }

  function handleSelection(friend) {
    // setSelectedFriend(friend);
    setSelectedFriend(friend);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendList friends={friends} onSelection={handleSelection} />
        {showAddFriend && <FormAddFriend addNewFriend={handleAddFriend} />}
        <Button handleShowFriend={handleShowFriend}>
          {showAddFriend ? 'Close' : 'Add Friend'}
        </Button>
      </div>
      {selectFriend && <FormSplitBill selectFriend={selectFriend} />}
    </div>
  );
}

function Button({ children, handleShowFriend }) {
  return (
    <button className="button" onClick={handleShowFriend}>
      {children}
    </button>
  );
}

function FriendList({ friends, onSelection }) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend friend={friend} key={friend.id} onSelection={onSelection} />
      ))}
    </ul>
  );
}

function Friend({ friend, onSelection }) {
  return (
    <li>
      <img src={friend.image} alt={friend.name}></img>
      <h3>{friend.name}</h3>
      {/* {friend.balance < 0 ? (
        <p className="red">you own clark {friend.balance}moneny</p>
      ) : (
        <p className="green">
          {friend.name} own you {friend.balance} money
        </p>
      )} */}

      {friend.balance < 0 && (
        <p className="red">you own clark {Math.abs(friend.balance)}moneny</p>
      )}
      {friend.balance > 0 && (
        <p className="green">
          {friend.name} own you {friend.balance}moneny
        </p>
      )}
      {friend.balance === 0 && <p className="">you and {friend.name} even</p>}
      {console.log(friend)}
      <Button handleShowFriend={() => onSelection(friend)}>Select</Button>
    </li>
  );
}

function FormAddFriend({ addNewFriend }) {
  const [name, setName] = useState('');
  const [image, setImage] = useState('https://i.pravatar.cc/48');
  function handleSubmit(e) {
    e.preventDefault();

    if (!name || !image) return;

    const id = crypto.randomUUID();

    const newFriend = {
      id,
      name,
      image: `${image}?=${id}`,
      balance: 0,
    };
    console.log(newFriend);
    addNewFriend(newFriend);

    setName('');
    setImage('https://i.pravatar.cc/48');
  }
  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>👬 Friend Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      ></input>
      {console.log(name)}

      <label>Image</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      ></input>
      {console.log(image)}

      <Button>Add</Button>
    </form>
  );
}

function FormSplitBill({ selectFriend }) {
  console.log(selectFriend);
  return (
    <form className="form-split-bill">
      <h2>Split the bill with {selectFriend.name}</h2>

      <label>𖭠 Bill Value</label>
      <input type="text"></input>
      <label>𖭠 You Spend</label>
      <input type="text"></input>
      <label>𖭠 {selectFriend.name}'s expense</label>
      <input type="text" disabled></input>

      <label>Who's Paying the Bill</label>
      <select>
        <option value="user">You</option>
        <option value="friend">{selectFriend.name}</option>
      </select>

      <Button>Split Bill</Button>
    </form>
  );
}

// -----testing for jonas code start here--------
// import { useState } from 'react';

// const initialFriends = [
//   {
//     id: 118836,
//     name: 'Clark',
//     image: 'https://i.pravatar.cc/48?u=118836',
//     balance: -7,
//   },
//   {
//     id: 933372,
//     name: 'Sarah',
//     image: 'https://i.pravatar.cc/48?u=933372',
//     balance: 20,
//   },
//   {
//     id: 499476,
//     name: 'Anthony',
//     image: 'https://i.pravatar.cc/48?u=499476',
//     balance: 0,
//   },
// ];

// function Button({ children, onClick }) {
//   return (
//     <button className="button" onClick={onClick}>
//       {children}
//     </button>
//   );
// }

// export default function App() {
//   const [friends, setFriends] = useState(initialFriends);
//   const [showAddFriend, setShowAddFriend] = useState(false);
//   const [selectedFriend, setSelectedFriend] = useState(null);

//   function handleShowAddFriend() {
//     setShowAddFriend((show) => !show);
//   }

//   function handleAddFriend(friend) {
//     setFriends((friends) => [...friends, friend]);
//     setShowAddFriend(false);
//   }

//   function handleSelection(friend) {
//     // setSelectedFriend(friend);
//     setSelectedFriend((cur) => (cur?.id === friend.id ? null : friend));
//     setShowAddFriend(false);
//   }

//   function handleSplitBill(value) {
//     setFriends((friends) =>
//     friends.map((friend) =>
//     friend.id === selectedFriend.id
//     ? { ...friend, balance: friend.balance + value }
//     : friend
//     )
//     );

//     setSelectedFriend(null);
//   }

//   return (
//     <div className="app">
//       <div className="sidebar">
//         <FriendsList
//           friends={friends}
//           selectedFriend={selectedFriend}
//           onSelection={handleSelection}
//         />

//         {showAddFriend && <FormAddFriend onAddFriend={handleAddFriend} />}

//         <Button onClick={handleShowAddFriend}>
//           {showAddFriend ? 'Close' : 'Add friend'}
//         </Button>
//       </div>

//       {selectedFriend && (
//         <FormSplitBill
//           selectedFriend={selectedFriend}
//           onSplitBill={handleSplitBill}
//           key={selectedFriend.id}
//         />
//       )}
//     </div>
//   );
// }

// function FriendsList({ friends, onSelection, selectedFriend }) {
//   return (
//     <ul>
//       {friends.map((friend) => (
//         <Friend
//           friend={friend}
//           key={friend.id}
//           selectedFriend={selectedFriend}
//           onSelection={onSelection}
//         />
//       ))}
//     </ul>
//   );
// }

// function Friend({ friend, onSelection, selectedFriend }) {
//   const isSelected = selectedFriend?.id === friend.id;

//   return (
//     <li className={isSelected ? 'selected' : ''}>
//       <img src={friend.image} alt={friend.name} />
//       <h3>{friend.name}</h3>

//       {friend.balance < 0 && (
//         <p className="red">
//           You owe {friend.name} {Math.abs(friend.balance)}€
//         </p>
//       )}
//       {friend.balance > 0 && (
//         <p className="green">
//           {friend.name} owes you {Math.abs(friend.balance)}€
//         </p>
//       )}
//       {friend.balance === 0 && <p>You and {friend.name} are even</p>}

//       <Button onClick={() => onSelection(friend)}>
//         {isSelected ? 'Close' : 'Select'}
//       </Button>
//     </li>
//   );
// }

// function FormAddFriend({ onAddFriend }) {
//   const [name, setName] = useState('');
//   const [image, setImage] = useState('https://i.pravatar.cc/48');

//   function handleSubmit(e) {
//     e.preventDefault();

//     if (!name || !image) return;

//     const id = crypto.randomUUID();
//     const newFriend = {
//       id,
//       name,
//       image: `${image}?=${id}`,
//       balance: 0,
//     };

//     onAddFriend(newFriend);

//     setName('');
//     setImage('https://i.pravatar.cc/48');
//   }

//   return (
//     <form className="form-add-friend" onSubmit={handleSubmit}>
//       <label>👫 Friend name</label>
//       <input
//         type="text"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//       />

//       <label>🌄 Image URL</label>
//       <input
//         type="text"
//         value={image}
//         onChange={(e) => setImage(e.target.value)}
//       />

//       <Button>Add</Button>
//     </form>
//   );
// }

// function FormSplitBill({ selectedFriend, onSplitBill }) {
//   const [bill, setBill] = useState('');
//   const [paidByUser, setPaidByUser] = useState('');
//   const paidByFriend = bill ? bill - paidByUser : '';
//   const [whoIsPaying, setWhoIsPaying] = useState('user');

//   function handleSubmit(e) {
//     e.preventDefault();

//     if (!bill || !paidByUser) return;
//     onSplitBill(whoIsPaying === 'user' ? paidByFriend : -paidByUser);
//   }

//   return (
//     <form className="form-split-bill" onSubmit={handleSubmit}>
//       <h2>Split a bill with {selectedFriend.name}</h2>

//       <label>💰 Bill value</label>
//       <input
//         type="text"
//         value={bill}
//         onChange={(e) => setBill(Number(e.target.value))}
//       />

//       <label>🧍‍♀️ Your expense</label>
//       <input
//         type="text"
//         value={paidByUser}
//         onChange={(e) =>
//           setPaidByUser(
//             Number(e.target.value) > bill ? paidByUser : Number(e.target.value)
//           )
//         }
//       />

//       <label>👫 {selectedFriend.name}'s expense</label>
//       <input type="text" disabled value={paidByFriend} />

//       <label>🤑 Who is paying the bill</label>
//       <select
//         value={whoIsPaying}
//         onChange={(e) => setWhoIsPaying(e.target.value)}
//       >
//         <option value="user">You</option>
//         <option value="friend">{selectedFriend.name}</option>
//       </select>

//       <Button>Split bill</Button>
//     </form>
//   );
// }

// -----testing for jonas code end here--------
