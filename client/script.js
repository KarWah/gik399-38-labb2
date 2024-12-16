// Function to fetch user data from the server
async function fetchUsers() {
    try {
      // Step 1: Fetch data from the API endpoint
      const response = await fetch("http://localhost:3000/users");
  
      // Step 2: Check if the response is OK
      if (!response.ok) {
        throw new Error(`Något gick fel: ${response.status}`);
      }
  
      // Step 3: Convert response to JSON
      const users = await response.json();
  
      // Step 4: Call the function to display users
      displayUsers(users);
    } catch (error) {
      console.error("Error fetching users:", error.message);
    }
  }
  
  // Function to dynamically display users in an HTML list
  function displayUsers(users) {
    const userList = document.createElement("ul");
    userList.classList.add("divide-y", "divide-gray-200");
  
    users.forEach((user) => {
      // Create a list item
      const listItem = document.createElement("li");
      listItem.classList.add(
        "p-4", "cursor-pointer", "hover:bg-gray-100", 
        "rounded", "transition-all", "duration-300"
      );
  
      // Add name as a clickable header
      listItem.innerHTML = `
        <div class="flex justify-between items-center">
          <p class="text-lg font-semibold text-gray-800">${user.firstName} ${user.lastName}</p>
          <span class="text-sm text-gray-500">▼</span>
        </div>
        <div class="hidden mt-2 p-2 bg-gray-50 rounded text-gray-600">
          <p><strong>ID:</strong> ${user.id}</p>
          <p><strong>Användarnamn:</strong> ${user.username}</p>
          <p>
            <strong>Color:</strong>
            <span style="background-color: ${user.color}; color: white; padding: 2px 6px; border-radius: 5px;">
              ${user.color}
            </span>
          </p>
        </div>
      `;
  
          // Set the dynamic hover effect for user's color
    listItem.addEventListener("mouseenter", () => {
        listItem.style.backgroundColor = user.color;
        listItem.style.color = "white";
      });
      listItem.addEventListener("mouseleave", () => {
        listItem.style.backgroundColor = "";
        listItem.style.color = "";
      });

      
      // Find the expandable content section
      const detailsSection = listItem.querySelector("div.hidden");
      const arrowIcon = listItem.querySelector("span");
  
      // Add click event to toggle visibility
      listItem.addEventListener("click", () => {
        detailsSection.classList.toggle("hidden");
        arrowIcon.textContent = detailsSection.classList.contains("hidden") ? "▼" : "▲";
      });
  
      // Append the list item to the UL
      userList.appendChild(listItem);
    });
  
    // Append the user list to the DOM
    const container = document.getElementById("user-list-container");
    container.innerHTML = ""; // Clear previous content
    container.appendChild(userList);
  }
  
  
  // Call the function to fetch and display users
  fetchUsers();
  