function AppViewModel() {
    self = this;
    self.countries = ko.observableArray(["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Anguilla", "Antigua and Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas"
        , "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "British Virgin Islands"
        , "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Chad", "Chile", "China", "Colombia", "Congo", "Cook Islands", "Costa Rica"
        , "Cote D Ivoire", "Croatia", "Cruise Ship", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea"
        , "Estonia", "Ethiopia", "Falkland Islands", "Faroe Islands", "Fiji", "Finland", "France", "French Polynesia", "French West Indies", "Gabon", "Gambia", "Georgia", "Germany", "Ghana"
        , "Gibraltar", "Greece", "Greenland", "Grenada", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea Bissau", "Guyana", "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland", "India"
        , "Indonesia", "Iran", "Iraq", "Ireland", "Isle of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kuwait", "Kyrgyz Republic", "Laos", "Latvia"
        , "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Mauritania"
        , "Mauritius", "Mexico", "Moldova", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Namibia", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia"
        , "New Zealand", "Nicaragua", "Niger", "Nigeria", "Norway", "Oman", "Pakistan", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal"
        , "Puerto Rico", "Qatar", "Reunion", "Romania", "Russia", "Rwanda", "Saint Pierre and Miquelon", "Samoa", "San Marino", "Satellite", "Saudi Arabia", "Senegal", "Serbia", "Seychelles"
        , "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "South Africa", "South Korea", "Spain", "Sri Lanka", "St Kitts and Nevis", "St Lucia", "St Vincent", "St. Lucia", "Sudan"
        , "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor L'Este", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia"
        , "Turkey", "Turkmenistan", "Turks and Caicos", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "United States Minor Outlying Islands", "Uruguay", "Uzbekistan", "Venezuela", "Vietnam", "Virgin Islands (US)"
        , "Yemen", "Zambia", "Zimbabwe"]);
    self.inputCountries = ko.observableArray();
    self.selectedCountries = ko.observableArray();
    self.isFocused = ko.observable(false);
    self.count = -1;
    self.inputField = document.getElementsByClassName('countries-input')[0];
    self.countriesList = document.getElementsByClassName('countries-list')[0];
    self.inputHint = document.getElementsByClassName("input-hint")[0];
    self.countryItem = undefined;

    self.inputHintHandler = (model, event) => {
        self.inputCountries.removeAll();
        self.isFocused(true);
    };

    self.outInputHandler = (model, event) => {
        var target = event.target;
        var targetClass = target.getAttribute('class'); 
        if( targetClass !== "countries-input" || targetClass !== "input-hint") {
            self.inputCountries.removeAll();
            self.count = -1;
        }
    };

    self.inputHandler = (model, event) => {
        var inputCountries = self.countries().filter(function (country) {
            country = country.toLowerCase();
            inputText = event.target.value.toLowerCase();
            return (country.indexOf(inputText) !== -1) ? true : false;
        });
        self.inputCountries(inputCountries);
        self.isFocused(false);
        var options = [].slice.call(document.getElementsByClassName("select-item"));
        var code = event.keyCode;
        self.countryItem = document.getElementsByClassName('select-item')[0];
        if(!self.inputCountries().length) {
            self.isFocused(true);
            self.inputHint.innerText = "No suitable country";
        } else {
            self.inputHint.innerText = "Start typing";
        }
        if(code === 13) {
            if(options[self.count]) {
                self.selectedCountries.push(options[self.count].innerText);
                self.inputField.value = '';
                self.inputCountries.removeAll();
                self.count = -1;
            }
        }
        if(!(code === 37 || code === 38 || code === 39 || code ===40)) {
            self.count = -1;
        }
        if (code === 40 && options.length && self.inputField.value) {
            self.count++;
            if(self.count > options.length-1) {
                self.count = 0;
            }
            if(self.count === 0) {
                options[options.length-1].classList.remove("active-country");
            } else {
                options[self.count-1].classList.remove("active-country");
            }
            options[self.count].classList.add("active-country");
        }
        if (code === 38 && options.length && self.inputField.value) {
            self.count--;
            if(self.count < 0) {
                self.count = options.length - 1;
            }
            if(self.count === options.length-1) {
                options[0].classList.remove("active-country");
            } else {
                options[self.count+1].classList.remove("active-country");
            }
            options[self.count].classList.add("active-country");
        }
        if(self.countriesList && self.countryItem) {
            if(self.countryItem.offsetHeight*(self.count+1) > self.countriesList.offsetHeight) {
                self.countriesList.scrollTop = self.countryItem.offsetHeight*self.count;
            } else {
                self.countriesList.scrollTop = 0;
            }
        }
    };

    self.overListHandler = (model, event) => {
        var target = event.target;
        var targetClass = target.getAttribute('class');
        var countries = [].slice.call(self.countriesList.children); 
        if(targetClass.indexOf('select-item') !== -1) {
            countries.forEach((country) => {
                country.classList.remove("active-country"); 
            });
            target.classList.add("active-country");
            if(self.count !== -1) {
                self.countriesList.children[self.count].classList.remove("active-country");
                self.count = self.inputCountries().findIndex((el) => el === target.innerText);
            }
        }
    };
 
    self.selectCountryHandler = (model, event) => {
        self.selectedCountries.push(event.target.innerText);
        self.inputField.value = '';
        self.inputCountries.removeAll();
        self.isFocused(false);
    };
    
    self.removeCountryHandler = (model, event) => {
        if (event.target.getAttribute("class") === "cross-delete") {
            var countryToDelete = event.target.nextElementSibling.innerText;
            self.selectedCountries.remove(countryToDelete);
        }
    };
}

var appViewModel = new AppViewModel();

ko.applyBindings(appViewModel);




