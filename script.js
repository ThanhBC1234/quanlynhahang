// Dữ liệu mẫu
let menuItems = [
  {
    id: "1",
    name: "Phở Bò Tái",
    price: 65000,
    description: "Phở bò truyền thống với thịt bò tái, nước dùng đậm đà",
    category: "Món chính",
    image: "https://images.unsplash.com/photo-1555126634-323283e090fa?w=300&h=200&fit=crop",
    available: true,
  },
  {
    id: "2",
    name: "Bún Chả Hà Nội",
    price: 55000,
    description: "Bún chả truyền thống Hà Nội với thịt nướng thơm ngon",
    category: "Món chính",
    image: "https://images.unsplash.com/photo-1559847844-d721426d6edc?w=300&h=200&fit=crop",
    available: true,
  },
  {
    id: "3",
    name: "Gỏi Cuốn Tôm Thịt",
    price: 35000,
    description: "Gỏi cuốn tươi với tôm, thịt và rau sống",
    category: "Khai vị",
    image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=300&h=200&fit=crop",
    available: true,
  },
  {
    id: "4",
    name: "Chả Cá Lã Vọng",
    price: 85000,
    description: "Chả cá truyền thống với thì là và bánh tráng",
    category: "Món chính",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=200&fit=crop",
    available: false,
  },
  {
    id: "5",
    name: "Chè Ba Màu",
    price: 25000,
    description: "Chè ba màu truyền thống với đậu xanh, đậu đỏ và thạch",
    category: "Tráng miệng",
    image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=300&h=200&fit=crop",
    available: true,
  },
  {
    id: "6",
    name: "Trà Đá",
    price: 10000,
    description: "Trà đá truyền thống",
    category: "Đồ uống",
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=300&h=200&fit=crop",
    available: true,
  },
  {
    id: "7",
    name: "Cà Phê Sữa Đá",
    price: 20000,
    description: "Cà phê sữa đá đậm đà",
    category: "Đồ uống",
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=300&h=200&fit=crop",
    available: true,
  },
  {
    id: "8",
    name: "Salad Rau Củ",
    price: 45000,
    description: "Salad rau củ tươi với sốt vinaigrette",
    category: "Salad",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300&h=200&fit=crop",
    available: true,
  },
]

const orders = [
  {
    id: "1001",
    customerName: "Nguyễn Văn A",
    tableNumber: 5,
    items: [
      { id: "1", menuItemId: "1", name: "Phở Bò Tái", price: 65000, quantity: 2 },
      { id: "2", menuItemId: "6", name: "Trà Đá", price: 10000, quantity: 2 },
    ],
    total: 150000,
    status: "pending",
    createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
  },
  {
    id: "1002",
    customerName: "Trần Thị B",
    tableNumber: 3,
    items: [
      { id: "3", menuItemId: "2", name: "Bún Chả Hà Nội", price: 55000, quantity: 1 },
      { id: "4", menuItemId: "3", name: "Gỏi Cuốn Tôm Thịt", price: 35000, quantity: 1 },
      { id: "5", menuItemId: "7", name: "Cà Phê Sữa Đá", price: 20000, quantity: 1 },
    ],
    total: 110000,
    status: "preparing",
    createdAt: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
  },
  {
    id: "1003",
    customerName: "Lê Văn C",
    tableNumber: 8,
    items: [
      { id: "6", menuItemId: "1", name: "Phở Bò Tái", price: 65000, quantity: 1 },
      { id: "7", menuItemId: "5", name: "Chè Ba Màu", price: 25000, quantity: 1 },
    ],
    total: 90000,
    status: "completed",
    createdAt: new Date(Date.now() - 120 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
  },
]

// Biến toàn cục
let currentEditingItem = null
let newOrderItems = []

// Khởi tạo ứng dụng
document.addEventListener("DOMContentLoaded", () => {
  initializeApp()
})

function initializeApp() {
  setupEventListeners()
  updateDashboardStats()
  renderMenuItems()
  renderOrders()
  initializeStatistics() // Thêm dòng này
}

function setupEventListeners() {
  // Tab navigation
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const tabName = this.dataset.tab
      switchTab(tabName)
    })
  })

  // Menu form submission
  document.getElementById("menuForm").addEventListener("submit", (e) => {
    e.preventDefault()
    saveMenuItem()
  })

  // Modal close on backdrop click
  document.querySelectorAll(".modal").forEach((modal) => {
    modal.addEventListener("click", function (e) {
      if (e.target === this) {
        this.classList.remove("active")
      }
    })
  })
}

function switchTab(tabName) {
  // Update tab buttons
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.classList.remove("active")
  })
  document.querySelector(`[data-tab="${tabName}"]`).classList.add("active")

  // Update tab content
  document.querySelectorAll(".tab-content").forEach((content) => {
    content.classList.remove("active")
  })
  document.getElementById(`${tabName}-tab`).classList.add("active")
}

function updateDashboardStats() {
  const totalRevenue = orders
    .filter((order) => order.status === "completed")
    .reduce((sum, order) => sum + order.total, 0)

  const pendingOrders = orders.filter((order) => order.status === "pending").length
  const completedOrders = orders.filter((order) => order.status === "completed").length

  document.getElementById("totalRevenue").textContent = formatCurrency(totalRevenue)
  document.getElementById("pendingOrders").textContent = pendingOrders
  document.getElementById("completedOrders").textContent = completedOrders
  document.getElementById("totalMenuItems").textContent = menuItems.length
}

function formatCurrency(amount) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount)
}

function formatNumber(amount) {
  return new Intl.NumberFormat("vi-VN").format(amount) + "đ"
}

// Menu Management Functions
function renderMenuItems() {
  const container = document.getElementById("menuContainer")
  const groupedItems = groupItemsByCategory()

  container.innerHTML = ""

  Object.entries(groupedItems).forEach(([category, items]) => {
    const categorySection = createCategorySection(category, items)
    container.appendChild(categorySection)
  })
}

function groupItemsByCategory() {
  return menuItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = []
    }
    acc[item.category].push(item)
    return acc
  }, {})
}

function createCategorySection(category, items) {
  const section = document.createElement("div")
  section.className = "category-section"

  section.innerHTML = `
        <div class="category-header">
            <h3 class="category-title">${category}</h3>
            <span class="category-badge">${items.length} món</span>
        </div>
        <div class="menu-grid">
            ${items.map((item) => createMenuItemCard(item)).join("")}
        </div>
    `

  return section
}

function createMenuItemCard(item) {
  return `
        <div class="menu-item ${!item.available ? "unavailable" : ""}">
            <div class="menu-item-image">
                <img src="${item.image}" alt="${item.name}" style="width: 100%; height: 100%; object-fit: cover;" 
                     onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                <div style="display: none; width: 100%; height: 100%; align-items: center; justify-content: center; background: #f1f5f9; color: #94a3b8;">
                    <i class="fas fa-image fa-3x"></i>
                </div>
                ${!item.available ? '<div class="unavailable-overlay">Hết hàng</div>' : ""}
            </div>
            <div class="menu-item-content">
                <div class="menu-item-header">
                    <h4 class="menu-item-name">${item.name}</h4>
                    <span class="menu-item-price">${formatNumber(item.price)}</span>
                </div>
                <p class="menu-item-description">${item.description}</p>
                <div class="menu-item-actions">
                    <button class="btn ${item.available ? "btn-outline" : "btn-success"} btn-sm" 
                            onclick="toggleAvailability('${item.id}')">
                        ${item.available ? "Hết hàng" : "Còn hàng"}
                    </button>
                    <div class="btn-group">
                        <button class="btn btn-outline btn-sm" onclick="editMenuItem('${item.id}')">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-outline btn-sm" onclick="deleteMenuItem('${item.id}')">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `
}

function openAddMenuModal() {
  currentEditingItem = null
  document.getElementById("menuModalTitle").textContent = "Thêm Món Ăn Mới"
  document.getElementById("menuForm").reset()
  document.getElementById("menuItemId").value = ""
  document.getElementById("menuModal").classList.add("active")
}

function editMenuItem(id) {
  const item = menuItems.find((item) => item.id === id)
  if (!item) return

  currentEditingItem = item
  document.getElementById("menuModalTitle").textContent = "Chỉnh Sửa Món Ăn"
  document.getElementById("menuItemId").value = item.id
  document.getElementById("menuName").value = item.name
  document.getElementById("menuPrice").value = item.price
  document.getElementById("menuCategory").value = item.category
  document.getElementById("menuDescription").value = item.description
  document.getElementById("menuImage").value = item.image
  document.getElementById("menuModal").classList.add("active")
}

function saveMenuItem() {
  const formData = {
    name: document.getElementById("menuName").value,
    price: Number.parseFloat(document.getElementById("menuPrice").value),
    category: document.getElementById("menuCategory").value,
    description: document.getElementById("menuDescription").value,
    image:
      document.getElementById("menuImage").value ||
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&h=200&fit=crop",
  }

  if (!formData.name || !formData.price || !formData.category) {
    alert("Vui lòng điền đầy đủ thông tin bắt buộc!")
    return
  }

  if (currentEditingItem) {
    // Update existing item
    const index = menuItems.findIndex((item) => item.id === currentEditingItem.id)
    menuItems[index] = { ...currentEditingItem, ...formData }
  } else {
    // Add new item
    const newItem = {
      id: Date.now().toString(),
      ...formData,
      available: true,
    }
    menuItems.push(newItem)
  }

  closeMenuModal()
  renderMenuItems()
  updateDashboardStats()
}

function deleteMenuItem(id) {
  if (confirm("Bạn có chắc chắn muốn xóa món ăn này?")) {
    menuItems = menuItems.filter((item) => item.id !== id)
    renderMenuItems()
    updateDashboardStats()
  }
}

function toggleAvailability(id) {
  const item = menuItems.find((item) => item.id === id)
  if (item) {
    item.available = !item.available
    renderMenuItems()
  }
}

function closeMenuModal() {
  document.getElementById("menuModal").classList.remove("active")
  currentEditingItem = null
}

// Order Management Functions
function renderOrders() {
  const container = document.getElementById("ordersContainer")

  if (orders.length === 0) {
    container.innerHTML = '<p class="text-center">Chưa có đơn hàng nào.</p>'
    return
  }

  container.innerHTML = orders.map((order) => createOrderCard(order)).join("")
}

function createOrderCard(order) {
  const statusClass = `status-${order.status}`
  const statusText = getStatusText(order.status)

  return `
        <div class="order-card">
            <div class="order-header">
                <div class="order-info">
                    <h3>
                        Đơn hàng #${order.id.slice(-6)}
                        <span class="order-status ${statusClass}">${statusText}</span>
                    </h3>
                    <p class="order-meta">Khách hàng: ${order.customerName} • Bàn: ${order.tableNumber}</p>
                </div>
                <div class="order-total">
                    <div class="order-total-amount">${formatNumber(order.total)}</div>
                    <div class="order-date">${formatDateTime(order.createdAt)}</div>
                </div>
            </div>
            <div class="order-content">
                <div class="order-items">
                    ${order.items
                      .slice(0, 3)
                      .map((item) => `<span class="order-item-badge">${item.name} x${item.quantity}</span>`)
                      .join("")}
                    ${order.items.length > 3 ? `<span class="order-item-badge">+${order.items.length - 3} món khác</span>` : ""}
                </div>
                <div class="order-actions">
                    <button class="btn btn-outline btn-sm" onclick="viewOrder('${order.id}')">
                        <i class="fas fa-eye"></i> Xem
                    </button>
                    ${getOrderActionButtons(order)}
                </div>
            </div>
        </div>
    `
}

function getStatusText(status) {
  const statusMap = {
    pending: "Chờ xử lý",
    preparing: "Đang chuẩn bị",
    completed: "Hoàn thành",
    cancelled: "Đã hủy",
  }
  return statusMap[status] || status
}

function getOrderActionButtons(order) {
  let buttons = ""

  if (order.status === "pending") {
    buttons += `
            <button class="btn btn-outline btn-sm" onclick="updateOrderStatus('${order.id}', 'preparing')">
                <i class="fas fa-clock"></i> Chuẩn bị
            </button>
            <button class="btn btn-outline btn-sm" onclick="updateOrderStatus('${order.id}', 'cancelled')">
                <i class="fas fa-times-circle"></i> Hủy
            </button>
        `
  } else if (order.status === "preparing") {
    buttons += `
            <button class="btn btn-outline btn-sm" onclick="updateOrderStatus('${order.id}', 'completed')">
                <i class="fas fa-check-circle"></i> Hoàn thành
            </button>
        `
  }

  return buttons
}

function formatDateTime(dateString) {
  return new Date(dateString).toLocaleString("vi-VN")
}

function openNewOrderModal() {
  newOrderItems = []
  document.getElementById("customerName").value = ""
  document.getElementById("tableNumber").value = ""
  renderSelectedItems()
  renderMenuSelection()
  document.getElementById("orderModal").classList.add("active")
}

function renderSelectedItems() {
  const container = document.getElementById("selectedItems")
  const totalElement = document.getElementById("orderTotal")

  if (newOrderItems.length === 0) {
    container.innerHTML = '<p style="color: #6b7280; font-style: italic;">Chưa chọn món nào</p>'
    totalElement.textContent = "0đ"
    return
  }

  container.innerHTML = newOrderItems
    .map(
      (item) => `
        <div class="selected-item">
            <span>${item.name}</span>
            <div class="item-controls">
                <button class="quantity-btn" onclick="removeItemFromOrder('${item.menuItemId}')">
                    <i class="fas fa-minus"></i>
                </button>
                <span style="margin: 0 0.5rem; font-weight: 500;">${item.quantity}</span>
                <button class="quantity-btn" onclick="addItemToOrder('${item.menuItemId}')">
                    <i class="fas fa-plus"></i>
                </button>
                <span style="margin-left: 1rem; font-weight: 500; min-width: 80px; text-align: right;">
                    ${formatNumber(item.price * item.quantity)}
                </span>
            </div>
        </div>
    `,
    )
    .join("")

  const total = newOrderItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  totalElement.textContent = formatNumber(total)
}

function renderMenuSelection() {
  const container = document.getElementById("menuSelection")
  const availableItems = menuItems.filter((item) => item.available)

  container.innerHTML = availableItems
    .map(
      (item) => `
        <div class="menu-selection-item" onclick="addItemToOrder('${item.id}')">
            <div class="item-info">
                <div class="item-name">${item.name}</div>
                <div class="item-price">${formatNumber(item.price)}</div>
            </div>
            <button class="btn btn-outline btn-sm">
                <i class="fas fa-plus"></i>
            </button>
        </div>
    `,
    )
    .join("")
}

function addItemToOrder(menuItemId) {
  const menuItem = menuItems.find((item) => item.id === menuItemId)
  if (!menuItem || !menuItem.available) return

  const existingItem = newOrderItems.find((item) => item.menuItemId === menuItemId)

  if (existingItem) {
    existingItem.quantity += 1
  } else {
    newOrderItems.push({
      id: Date.now().toString(),
      menuItemId: menuItem.id,
      name: menuItem.name,
      price: menuItem.price,
      quantity: 1,
    })
  }

  renderSelectedItems()
}

function removeItemFromOrder(menuItemId) {
  const existingItem = newOrderItems.find((item) => item.menuItemId === menuItemId)

  if (existingItem) {
    if (existingItem.quantity > 1) {
      existingItem.quantity -= 1
    } else {
      newOrderItems = newOrderItems.filter((item) => item.menuItemId !== menuItemId)
    }
  }

  renderSelectedItems()
}

function createOrder() {
  const customerName = document.getElementById("customerName").value
  const tableNumber = document.getElementById("tableNumber").value

  if (!customerName || !tableNumber || newOrderItems.length === 0) {
    alert("Vui lòng điền đầy đủ thông tin và chọn ít nhất một món!")
    return
  }

  const total = newOrderItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const newOrder = {
    id: Date.now().toString(),
    customerName,
    tableNumber: Number.parseInt(tableNumber),
    items: [...newOrderItems],
    total,
    status: "pending",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  orders.unshift(newOrder)
  closeOrderModal()
  renderOrders()
  updateDashboardStats()

  alert("Đơn hàng đã được tạo thành công!")
}

function updateOrderStatus(orderId, newStatus) {
  const order = orders.find((order) => order.id === orderId)
  if (order) {
    order.status = newStatus
    order.updatedAt = new Date().toISOString()
    renderOrders()
    updateDashboardStats()
  }
}

function viewOrder(orderId) {
  const order = orders.find((order) => order.id === orderId)
  if (!order) return

  document.getElementById("viewOrderTitle").textContent = `Chi Tiết Đơn Hàng #${order.id.slice(-6)}`
  document.getElementById("orderDetails").innerHTML = createOrderDetailsHTML(order)
  document.getElementById("viewOrderModal").classList.add("active")
}

function createOrderDetailsHTML(order) {
  return `
        <div class="order-detail-section">
            <div class="order-detail-grid">
                <div class="detail-item">
                    <span class="detail-label">Khách hàng</span>
                    <span class="detail-value">${order.customerName}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Số bàn</span>
                    <span class="detail-value">${order.tableNumber}</span>
                </div>
            </div>
            <div class="detail-item mb-3">
                <span class="detail-label">Trạng thái</span>
                <span class="order-status status-${order.status}">${getStatusText(order.status)}</span>
            </div>
        </div>
        
        <div class="order-detail-section">
            <h4>Món ăn</h4>
            <div class="order-items-list">
                ${order.items
                  .map(
                    (item) => `
                    <div class="order-item-row">
                        <div class="item-details">
                            <div class="item-name-qty">${item.name}</div>
                            <div class="item-unit-price">${formatNumber(item.price)} x ${item.quantity}</div>
                        </div>
                        <div class="item-total-price">${formatNumber(item.price * item.quantity)}</div>
                    </div>
                `,
                  )
                  .join("")}
                <div class="order-item-row total">
                    <span>Tổng cộng:</span>
                    <span style="color: #059669;">${formatNumber(order.total)}</span>
                </div>
            </div>
        </div>
        
        <div class="order-detail-section">
            <div class="order-detail-grid">
                <div class="detail-item">
                    <span class="detail-label">Thời gian tạo</span>
                    <span class="detail-value">${formatDateTime(order.createdAt)}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Cập nhật lần cuối</span>
                    <span class="detail-value">${formatDateTime(order.updatedAt)}</span>
                </div>
            </div>
        </div>
    `
}

function closeOrderModal() {
  document.getElementById("orderModal").classList.remove("active")
  newOrderItems = []
}

function closeViewOrderModal() {
  document.getElementById("viewOrderModal").classList.remove("active")
}

// Thêm dữ liệu đơn hàng mở rộng cho thống kê
const extendedOrders = [
  ...orders,
  // Thêm đơn hàng của các ngày trước
  {
    id: "1004",
    customerName: "Phạm Văn D",
    tableNumber: 2,
    items: [
      { id: "8", menuItemId: "1", name: "Phở Bò Tái", price: 65000, quantity: 1 },
      { id: "9", menuItemId: "7", name: "Cà Phê Sữa Đá", price: 20000, quantity: 2 },
    ],
    total: 105000,
    status: "completed",
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 ngày trước
    updatedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "1005",
    customerName: "Hoàng Thị E",
    tableNumber: 6,
    items: [
      { id: "10", menuItemId: "2", name: "Bún Chả Hà Nội", price: 55000, quantity: 2 },
      { id: "11", menuItemId: "3", name: "Gỏi Cuốn Tôm Thịt", price: 35000, quantity: 1 },
    ],
    total: 145000,
    status: "completed",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 ngày trước
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "1006",
    customerName: "Nguyễn Văn F",
    tableNumber: 4,
    items: [
      { id: "12", menuItemId: "4", name: "Chả Cá Lã Vọng", price: 85000, quantity: 1 },
      { id: "13", menuItemId: "5", name: "Chè Ba Màu", price: 25000, quantity: 2 },
    ],
    total: 135000,
    status: "completed",
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 ngày trước
    updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "1007",
    customerName: "Trần Thị G",
    tableNumber: 7,
    items: [
      { id: "14", menuItemId: "1", name: "Phở Bò Tái", price: 65000, quantity: 2 },
      { id: "15", menuItemId: "6", name: "Trà Đá", price: 10000, quantity: 3 },
    ],
    total: 160000,
    status: "completed",
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 1 tuần trước
    updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "1008",
    customerName: "Lê Văn H",
    tableNumber: 1,
    items: [
      { id: "16", menuItemId: "8", name: "Salad Rau Củ", price: 45000, quantity: 1 },
      { id: "17", menuItemId: "7", name: "Cà Phê Sữa Đá", price: 20000, quantity: 1 },
    ],
    total: 65000,
    status: "completed",
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), // 1 tháng trước
    updatedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
  },
]

// Cập nhật orders với dữ liệu mở rộng
orders.push(...extendedOrders.slice(3)) // Thêm các đơn hàng mới

// Khởi tạo thống kê khi load trang
function initializeStatistics() {
  // Set ngày hiện tại làm mặc định
  const today = new Date().toISOString().split("T")[0]
  document.getElementById("statsDate").value = today
  updateStatistics()
}

function updateStatistics() {
  const statsType = document.getElementById("statsType").value
  const selectedDate = new Date(document.getElementById("statsDate").value)

  const currentPeriodData = getStatisticsData(statsType, selectedDate)
  const previousPeriodData = getPreviousPeriodData(statsType, selectedDate)

  updateSummaryCards(currentPeriodData, previousPeriodData)
  renderRevenueChart(statsType, selectedDate)
  renderTimeDetails(statsType, selectedDate)
  renderTopItems(currentPeriodData.orders)
  renderCategoryAnalysis(currentPeriodData.orders)
}

function getStatisticsData(type, date) {
  let filteredOrders = []

  switch (type) {
    case "daily":
      filteredOrders = orders.filter((order) => {
        const orderDate = new Date(order.createdAt)
        return orderDate.toDateString() === date.toDateString() && order.status === "completed"
      })
      break

    case "monthly":
      filteredOrders = orders.filter((order) => {
        const orderDate = new Date(order.createdAt)
        return (
          orderDate.getMonth() === date.getMonth() &&
          orderDate.getFullYear() === date.getFullYear() &&
          order.status === "completed"
        )
      })
      break

    case "yearly":
      filteredOrders = orders.filter((order) => {
        const orderDate = new Date(order.createdAt)
        return orderDate.getFullYear() === date.getFullYear() && order.status === "completed"
      })
      break
  }

  const revenue = filteredOrders.reduce((sum, order) => sum + order.total, 0)
  const orderCount = filteredOrders.length
  const avgOrderValue = orderCount > 0 ? revenue / orderCount : 0

  return {
    revenue,
    orderCount,
    avgOrderValue,
    orders: filteredOrders,
  }
}

function getPreviousPeriodData(type, date) {
  const previousDate = new Date(date)

  switch (type) {
    case "daily":
      previousDate.setDate(previousDate.getDate() - 1)
      break
    case "monthly":
      previousDate.setMonth(previousDate.getMonth() - 1)
      break
    case "yearly":
      previousDate.setFullYear(previousDate.getFullYear() - 1)
      break
  }

  return getStatisticsData(type, previousDate)
}

function updateSummaryCards(current, previous) {
  // Cập nhật doanh thu
  document.getElementById("periodRevenue").textContent = formatNumber(current.revenue)
  const revenueChange = calculatePercentageChange(current.revenue, previous.revenue)
  updateChangeElement("revenueChange", revenueChange)

  // Cập nhật số đơn hàng
  document.getElementById("periodOrders").textContent = current.orderCount
  const ordersChange = calculatePercentageChange(current.orderCount, previous.orderCount)
  updateChangeElement("ordersChange", ordersChange)

  // Cập nhật giá trị trung bình
  document.getElementById("avgOrderValue").textContent = formatNumber(current.avgOrderValue)
  const avgChange = calculatePercentageChange(current.avgOrderValue, previous.avgOrderValue)
  updateChangeElement("avgChange", avgChange)

  // Cập nhật món bán chạy
  const topItem = getTopSellingItem(current.orders)
  document.getElementById("topItem").textContent = topItem.name || "-"
  document.getElementById("topItemCount").textContent = `${topItem.count} lần`
}

function calculatePercentageChange(current, previous) {
  if (previous === 0) return current > 0 ? 100 : 0
  return ((current - previous) / previous) * 100
}

function updateChangeElement(elementId, change) {
  const element = document.getElementById(elementId)
  const absChange = Math.abs(change)
  const sign = change > 0 ? "+" : change < 0 ? "-" : ""

  element.textContent = `${sign}${absChange.toFixed(1)}%`
  element.className = "stat-change " + (change > 0 ? "positive" : change < 0 ? "negative" : "neutral")
}

function getTopSellingItem(orders) {
  const itemCounts = {}

  orders.forEach((order) => {
    order.items.forEach((item) => {
      if (itemCounts[item.name]) {
        itemCounts[item.name] += item.quantity
      } else {
        itemCounts[item.name] = item.quantity
      }
    })
  })

  let topItem = { name: "", count: 0 }
  Object.entries(itemCounts).forEach(([name, count]) => {
    if (count > topItem.count) {
      topItem = { name, count }
    }
  })

  return topItem
}

function renderRevenueChart(type, selectedDate) {
  const chartContainer = document.getElementById("revenueChart")
  const chartData = getChartData(type, selectedDate)

  if (chartData.length === 0) {
    chartContainer.innerHTML =
      '<p class="text-center" style="color: #64748b; padding: 2rem;">Không có dữ liệu để hiển thị</p>'
    return
  }

  const maxValue = Math.max(...chartData.map((item) => item.value))

  chartContainer.innerHTML = chartData
    .map((item) => {
      const height = maxValue > 0 ? (item.value / maxValue) * 250 : 0
      return `
      <div class="chart-bar" style="height: ${height}px;" title="${item.label}: ${formatNumber(item.value)}">
        <div class="chart-bar-value">${formatNumber(item.value)}</div>
        <div class="chart-bar-label">${item.label}</div>
      </div>
    `
    })
    .join("")
}

function getChartData(type, selectedDate) {
  const data = []

  switch (type) {
    case "daily":
      // Hiển thị 7 ngày gần nhất
      for (let i = 6; i >= 0; i--) {
        const date = new Date(selectedDate)
        date.setDate(date.getDate() - i)
        const dayOrders = orders.filter((order) => {
          const orderDate = new Date(order.createdAt)
          return orderDate.toDateString() === date.toDateString() && order.status === "completed"
        })
        const revenue = dayOrders.reduce((sum, order) => sum + order.total, 0)
        data.push({
          label: date.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit" }),
          value: revenue,
        })
      }
      break

    case "monthly":
      // Hiển thị 12 tháng gần nhất
      for (let i = 11; i >= 0; i--) {
        const date = new Date(selectedDate)
        date.setMonth(date.getMonth() - i)
        const monthOrders = orders.filter((order) => {
          const orderDate = new Date(order.createdAt)
          return (
            orderDate.getMonth() === date.getMonth() &&
            orderDate.getFullYear() === date.getFullYear() &&
            order.status === "completed"
          )
        })
        const revenue = monthOrders.reduce((sum, order) => sum + order.total, 0)
        data.push({
          label: date.toLocaleDateString("vi-VN", { month: "2-digit", year: "2-digit" }),
          value: revenue,
        })
      }
      break

    case "yearly":
      // Hiển thị 5 năm gần nhất
      for (let i = 4; i >= 0; i--) {
        const year = selectedDate.getFullYear() - i
        const yearOrders = orders.filter((order) => {
          const orderDate = new Date(order.createdAt)
          return orderDate.getFullYear() === year && order.status === "completed"
        })
        const revenue = yearOrders.reduce((sum, order) => sum + order.total, 0)
        data.push({
          label: year.toString(),
          value: revenue,
        })
      }
      break
  }

  return data
}

function renderTimeDetails(type, selectedDate) {
  const container = document.getElementById("timeDetails")
  const data = getDetailedTimeData(type, selectedDate)

  if (data.length === 0) {
    container.innerHTML = '<p style="color: #64748b; text-align: center;">Không có dữ liệu</p>'
    return
  }

  container.innerHTML = data
    .map(
      (item) => `
    <div class="time-detail-item">
      <span class="time-detail-date">${item.label}</span>
      <span class="time-detail-revenue">${formatNumber(item.revenue)}</span>
    </div>
  `,
    )
    .join("")
}

function getDetailedTimeData(type, selectedDate) {
  const data = []
  const limit = type === "daily" ? 7 : type === "monthly" ? 12 : 5

  for (let i = limit - 1; i >= 0; i--) {
    const date = new Date(selectedDate)
    let label = ""
    let filteredOrders = []

    switch (type) {
      case "daily":
        date.setDate(date.getDate() - i)
        label = date.toLocaleDateString("vi-VN")
        filteredOrders = orders.filter((order) => {
          const orderDate = new Date(order.createdAt)
          return orderDate.toDateString() === date.toDateString() && order.status === "completed"
        })
        break

      case "monthly":
        date.setMonth(date.getMonth() - i)
        label = date.toLocaleDateString("vi-VN", { month: "long", year: "numeric" })
        filteredOrders = orders.filter((order) => {
          const orderDate = new Date(order.createdAt)
          return (
            orderDate.getMonth() === date.getMonth() &&
            orderDate.getFullYear() === date.getFullYear() &&
            order.status === "completed"
          )
        })
        break

      case "yearly":
        const year = selectedDate.getFullYear() - i
        label = year.toString()
        filteredOrders = orders.filter((order) => {
          const orderDate = new Date(order.createdAt)
          return orderDate.getFullYear() === year && order.status === "completed"
        })
        break
    }

    const revenue = filteredOrders.reduce((sum, order) => sum + order.total, 0)
    if (revenue > 0) {
      data.push({ label, revenue })
    }
  }

  return data.reverse()
}

function renderTopItems(orders) {
  const container = document.getElementById("topItems")
  const itemStats = {}

  orders.forEach((order) => {
    order.items.forEach((item) => {
      if (itemStats[item.name]) {
        itemStats[item.name].count += item.quantity
        itemStats[item.name].revenue += item.price * item.quantity
      } else {
        const menuItem = menuItems.find((m) => m.id === item.menuItemId)
        itemStats[item.name] = {
          count: item.quantity,
          revenue: item.price * item.quantity,
          category: menuItem ? menuItem.category : "Khác",
        }
      }
    })
  })

  const sortedItems = Object.entries(itemStats)
    .sort(([, a], [, b]) => b.count - a.count)
    .slice(0, 5)

  if (sortedItems.length === 0) {
    container.innerHTML = '<p style="color: #64748b; text-align: center;">Không có dữ liệu</p>'
    return
  }

  container.innerHTML = sortedItems
    .map(
      ([name, stats]) => `
    <div class="top-item">
      <div class="top-item-info">
        <div class="top-item-name">${name}</div>
        <div class="top-item-category">${stats.category}</div>
      </div>
      <div class="top-item-stats">
        <span class="top-item-count">${stats.count} lần</span>
        <span class="top-item-revenue">${formatNumber(stats.revenue)}</span>
      </div>
    </div>
  `,
    )
    .join("")
}

function renderCategoryAnalysis(orders) {
  const container = document.getElementById("categoryAnalysis")
  const categoryStats = {}

  orders.forEach((order) => {
    order.items.forEach((item) => {
      const menuItem = menuItems.find((m) => m.id === item.menuItemId)
      const category = menuItem ? menuItem.category : "Khác"

      if (categoryStats[category]) {
        categoryStats[category] += item.price * item.quantity
      } else {
        categoryStats[category] = item.price * item.quantity
      }
    })
  })

  const totalRevenue = Object.values(categoryStats).reduce((sum, revenue) => sum + revenue, 0)
  const sortedCategories = Object.entries(categoryStats).sort(([, a], [, b]) => b - a)

  if (sortedCategories.length === 0) {
    container.innerHTML = '<p style="color: #64748b; text-align: center;">Không có dữ liệu</p>'
    return
  }

  container.innerHTML = sortedCategories
    .map(([category, revenue]) => {
      const percentage = totalRevenue > 0 ? (revenue / totalRevenue) * 100 : 0
      return `
      <div class="category-item">
        <div class="category-header">
          <span class="category-name">${category}</span>
          <span class="category-revenue">${formatNumber(revenue)}</span>
        </div>
        <div class="category-bar">
          <div class="category-bar-fill" style="width: ${percentage}%"></div>
        </div>
      </div>
    `
    })
    .join("")
}

function exportStatistics() {
  const statsType = document.getElementById("statsType").value
  const selectedDate = new Date(document.getElementById("statsDate").value)
  const data = getStatisticsData(statsType, selectedDate)

  const reportData = {
    type: statsType,
    date: selectedDate.toLocaleDateString("vi-VN"),
    summary: {
      revenue: data.revenue,
      orderCount: data.orderCount,
      avgOrderValue: data.avgOrderValue,
    },
    orders: data.orders.map((order) => ({
      id: order.id,
      customer: order.customerName,
      table: order.tableNumber,
      total: order.total,
      date: new Date(order.createdAt).toLocaleDateString("vi-VN"),
    })),
  }

  const dataStr = JSON.stringify(reportData, null, 2)
  const dataBlob = new Blob([dataStr], { type: "application/json" })
  const url = URL.createObjectURL(dataBlob)
  const link = document.createElement("a")
  link.href = url
  link.download = `bao-cao-${statsType}-${selectedDate.toISOString().split("T")[0]}.json`
  link.click()
  URL.revokeObjectURL(url)

  alert("Báo cáo đã được xuất thành công!")
}
