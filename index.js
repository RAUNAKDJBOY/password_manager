
        let passwords = [];
        let showPassword = {};

        function loadPasswords() {
            let saved = localStorage.getItem("passwords");
            if (saved) {
                passwords = JSON.parse(saved);
            }
            displayPasswords();
        }

        function savePasswords() {
            localStorage.setItem("passwords", JSON.stringify(passwords));
        }

        function displayPasswords() {
            let list = document.getElementById("passwordsList");
            if (passwords.length === 0) {
                list.innerHTML = "<p>No passwords yet!</p>";
                return;
            }

            let table = "<table><tr><th>Website</th><th>Username</th><th>Password</th><th>Action</th></tr>";

            passwords.forEach((item, i) => {
                let pass = showPassword[i] ? item.password : "••••••";
                let btnText = showPassword[i] ? "Hide" : "Show";

                table += `<tr>
                            <td>${item.website}</td>
                            <td>${item.username}</td>
                            <td>${pass} <button onclick="toggle(${i})">${btnText}</button></td>
                            <td><button onclick="removePassword(${i})">Delete</button></td>
                          </tr>`;
            });

            table += "</table>";
            list.innerHTML = table;
        }

        function toggle(i) {
            showPassword[i] = !showPassword[i];
            displayPasswords();
        }

        function removePassword(i) {
            passwords.splice(i, 1);
            savePasswords();
            displayPasswords();
        }

        document.getElementById("passwordForm").addEventListener("submit", function(e) {
            e.preventDefault();
            let website = document.getElementById("website").value;
            let username = document.getElementById("username").value;
            let password = document.getElementById("password").value;

            passwords.push({ website, username, password });
            savePasswords();
            displayPasswords();
            this.reset();
        });

        window.onload = loadPasswords;
    