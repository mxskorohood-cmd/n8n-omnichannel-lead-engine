// Loop through all incoming items from the previous node
for (const item of $input.all()) {
  // FORCE CONVERSION TO STRING
  // Use ?? (nullish coalescing) to handle null or undefined values safely
  let contact = String(item.json.Contact ?? "");
  let name = String(item.json.Name ?? "");

  // 1. Contact sanitization: remove all non-digit characters
  let cleanContact = contact.replace(/\D/g, ''); 
  
  // USA Logic:
  // If the number is 10 digits (local format), prepend country code '1'
  if (cleanContact.length === 10) {
    cleanContact = '1' + cleanContact;
  } 
  // If the number is 11 digits starting with '1', it's already correct.
  // Other lengths are kept as-is to avoid losing data in case of international leads.
  
  // 2. Pretty name formatting: "max" -> "Max", "JANE" -> "Jane"
  let cleanName = name.trim();
  if (cleanName) {
    // Capitalize the first letter and force the rest to lowercase
    cleanName = cleanName.charAt(0).toUpperCase() + cleanName.slice(1).toLowerCase();
  }

  // Write the sanitized data back into the item object
  item.json.Contact = cleanContact;
  item.json.Name = cleanName;
}

// Return the processed items to the next node in the workflow
return $input.all();
