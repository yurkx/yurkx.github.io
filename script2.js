// Function to add a new item to the shopping list
function addItem() {
    const newItemInput = document.getElementById('new-item');
    const itemText = newItemInput.value.trim();
  
    if (itemText === '') {
      alert('Please enter an item.');
      return;
    }
  
    // Create list item elements
    const listItem = document.createElement('li');
    const itemLabel = document.createElement('span');
    itemLabel.textContent = itemText;
  
    // Create Delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = function() {
      if (confirm(`Are you sure you want to delete "${itemText}"?`)) {
        listItem.remove();
      }
    };
  
    // Create Edit button
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.onclick = function() {
      const newText = prompt('Edit item:', itemLabel.textContent);
      if (newText !== null && newText.trim() !== '') {
        itemLabel.textContent = newText.trim();
      }
    };
  
    // Append elements to the list item
    listItem.appendChild(itemLabel);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
  
    // Append list item to the shopping list
    document.getElementById('shopping-list').appendChild(listItem);
  
    // Clear the input field and set focus back to it
    newItemInput.value = '';
    newItemInput.focus();
  }
  