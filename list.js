const itemForm = document.getElementById('itemForm');
const itemList = document.getElementById('itemList');
const totalValue = document.getElementById('totalValue');

let items = [];

itemForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const itemName = document.getElementById('itemName').value.trim();
  const itemStock = parseInt(document.getElementById('itemStock').value, 10);
  const itemToReplenish = parseInt(document.getElementById('itemToReplenish').value, 10);

  items.push({ 
    name: itemName, 
    stock: itemStock, 
    replenish: itemToReplenish, 
    cost: 0, 
    totalValue: 0, 
    purchased: false 
  });

  renderItems();
  updateTotal();
  itemForm.reset();
});

function renderItems() {
  itemList.innerHTML = '';
  items.forEach((item, index) => {
    const row = document.createElement('tr');
    row.classList.toggle('purchased', item.purchased);

    row.innerHTML = `
      <td>${item.name}</td>
      <td>${item.stock}</td>
      <td>${item.replenish}</td>
      <td>
        <input type="number" value="${item.cost}" step="0.01" 
               onchange="updateCost(${index}, this.value)">
      </td>
      <td id="total-${index}">R$ ${item.totalValue.toFixed(2)}</td>
      <td>
        <input type="checkbox" ${item.purchased ? 'checked' : ''} 
               onchange="togglePurchased(${index})">
      </td>
      <td>
        <button onclick="deleteItem(${index})">Excluir</button>
      </td>
    `;

    itemList.appendChild(row);
  });
}

function updateCost(index, cost) {
  items[index].cost = parseFloat(cost) || 0;
  items[index].totalValue = items[index].cost * items[index].replenish;

  document.getElementById(`total-${index}`).textContent = 
    `R$ ${items[index].totalValue.toFixed(2)}`;
  
  updateTotal();
}

function togglePurchased(index) {
  items[index].purchased = !items[index].purchased;
  renderItems();
}

function deleteItem(index) {
  items.splice(index, 1);
  renderItems();
  updateTotal();
}

function updateTotal() {
  const total = items.reduce((sum, item) => sum + item.totalValue, 0);
  totalValue.textContent = total.toFixed(2);
}
