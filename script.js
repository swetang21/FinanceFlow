document.addEventListener("DOMContentLoaded", () => {
  initializeNavigation();
  initializeCalculator();
  initializeAnimations();
});

function initializeNavigation() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  let lastScroll = 0;
  window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar");
    const currentScroll = window.pageYOffset;

    if (currentScroll > lastScroll && currentScroll > 100) {
      navbar.style.transform = "translateY(-100%)";
    } else {
      navbar.style.transform = "translateY(0)";
    }
    lastScroll = currentScroll;
  });
}

class LoanCalculator {
  constructor() {
    this.initializeElements();
    this.attachEventListeners();
  }

  initializeElements() {
    this.loanAmount = document.getElementById("loanAmount");
    this.interestRate = document.getElementById("interestRate");
    this.loanTerm = document.getElementById("loanTerm");
    this.calculateBtn = document.getElementById("calculateBtn");
    this.monthlyPayment = document.getElementById("monthlyPayment");
    this.resultDetails = document.getElementById("resultDetails");
  }

  attachEventListeners() {
    this.calculateBtn.addEventListener("click", () => this.calculateLoan());

    [this.loanAmount, this.interestRate, this.loanTerm].forEach((input) => {
      input.addEventListener("input", (e) => this.validateInput(e.target));
      input.addEventListener("keypress", (e) => {
        if (e.key === "Enter") this.calculateLoan();
      });
    });
  }

  validateInput(input) {
    const value = parseFloat(input.value);
    if (isNaN(value) || value <= 0) {
      input.classList.add("error");
      return false;
    }
    input.classList.remove("error");
    input.classList.add("valid");
    return true;
  }

  calculateLoan() {
    try {
      const amount = parseFloat(this.loanAmount.value);
      const rate = parseFloat(this.interestRate.value) / 100 / 12;
      const term = parseFloat(this.loanTerm.value) * 12;

      if (!this.validateInputs(amount, rate, term)) {
        return;
      }

      const monthlyPayment =
        (amount * rate * Math.pow(1 + rate, term)) /
        (Math.pow(1 + rate, term) - 1);
      const totalPayment = monthlyPayment * term;
      const totalInterest = totalPayment - amount;

      this.displayResults(monthlyPayment, totalPayment, totalInterest);
      this.showSuccess("Calculation completed successfully!");
    } catch (error) {
      this.showError("Please check your inputs and try again.");
      console.error("Calculation error:", error);
    }
  }

  validateInputs(amount, rate, term) {
    if (
      isNaN(amount) ||
      isNaN(rate) ||
      isNaN(term) ||
      amount <= 0 ||
      rate <= 0 ||
      term <= 0
    ) {
      this.showError("Please enter valid positive numbers");
      return false;
    }
    return true;
  }

  displayResults(monthlyPayment, totalPayment, totalInterest) {
    this.monthlyPayment.textContent = `$${monthlyPayment.toFixed(2)}`;
    this.resultDetails.innerHTML = `
            <div class="result-detail-item fade-in">
                <span>Total Payment:</span>
                <span class="value">$${totalPayment.toFixed(2)}</span>
            </div>
            <div class="result-detail-item fade-in">
                <span>Total Interest:</span>
                <span class="value">$${totalInterest.toFixed(2)}</span>
            </div>
            <div class="result-detail-item fade-in">
                <span>Loan Term:</span>
                <span class="value">${this.loanTerm.value} years</span>
            </div>
            <div class="result-detail-item fade-in">
                <span>Interest Rate:</span>
                <span class="value">${this.interestRate.value}%</span>
            </div>
        `;

    document.querySelector(".calculator-result").classList.add("active");
  }

  showError(message) {
    const errorDiv = document.createElement("div");
    errorDiv.className = "calculator-error fade-in";
    errorDiv.textContent = message;

    const existingError = document.querySelector(".calculator-error");
    if (existingError) {
      existingError.remove();
    }

    this.calculateBtn.insertAdjacentElement("afterend", errorDiv);

    setTimeout(() => {
      errorDiv.remove();
    }, 3000);
  }

  showSuccess(message) {
    const successDiv = document.createElement("div");
    successDiv.className = "calculator-success fade-in";
    successDiv.textContent = message;

    const existingSuccess = document.querySelector(".calculator-success");
    if (existingSuccess) {
      existingSuccess.remove();
    }

    this.calculateBtn.insertAdjacentElement("afterend", successDiv);

    setTimeout(() => {
      successDiv.remove();
    }, 3000);
  }
}

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("mouseenter", () => {
    link.style.transform = "translateY(-2px)";
  });
  link.addEventListener("mouseleave", () => {
    link.style.transform = "translateY(0)";
  });
});

const animateOnScroll = () => {
  const elements = document.querySelectorAll(".animate-on-scroll");
  elements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    if (elementTop < window.innerHeight - 100) {
      element.classList.add("visible");
    }
  });
};

window.addEventListener("scroll", animateOnScroll);

function initializeAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px",
    }
  );

  document.querySelectorAll(".animate-on-scroll").forEach((element) => {
    observer.observe(element);
  });
}

function initializeCalculator() {
  new LoanCalculator();
}

document.addEventListener("DOMContentLoaded", () => {
  initializeNavigation();
  initializeCalculator();
  initializeAnimations();
  initializeHamburgerMenu();
});

function initializeHamburgerMenu() {
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");
  const body = document.body;

  const overlay = document.createElement("div");
  overlay.className = "nav-overlay";
  body.appendChild(overlay);

  function toggleMenu() {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("active");
    overlay.classList.toggle("active");
    body.style.overflow = body.style.overflow === "hidden" ? "" : "hidden";
  }

  hamburger.addEventListener("click", toggleMenu);

  overlay.addEventListener("click", toggleMenu);

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      if (navLinks.classList.contains("active")) {
        toggleMenu();
      }
    });
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 768 && navLinks.classList.contains("active")) {
      toggleMenu();
    }
  });
}
