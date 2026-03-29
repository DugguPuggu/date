document.addEventListener('DOMContentLoaded', function() {
    // Page navigation
    const landingPage = document.getElementById('landingPage');
    const surveyPage = document.getElementById('surveyPage');
    const startSurveyBtn = document.getElementById('startSurveyBtn');

    // Show survey page when start button is clicked
    startSurveyBtn.addEventListener('click', function() {
        landingPage.style.display = 'none';
        surveyPage.style.display = 'block';
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Slider value display
    const foodSlider = document.getElementById('foodRating');
    const foodValue = document.getElementById('foodValue');
    
    foodSlider.addEventListener('input', function() {
        foodValue.textContent = this.value;
    });

    // Form submission
    const form = document.getElementById('dateReviewForm');
    const resultSection = document.getElementById('resultSection');
    const submitBtn = document.getElementById('submitBtn');
    const resetBtn = document.getElementById('resetBtn');

    // Report elements
    const reportRating = document.getElementById('reportRating');
    const reportFunny = document.getElementById('reportFunny');
    const reportWeird = document.getElementById('reportWeird');
    const reportFood = document.getElementById('reportFood');
    const reportWalk = document.getElementById('reportWalk');
    const reportCafe = document.getElementById('reportCafe');
    const reportGenre = document.getElementById('reportGenre');
    const reportImprovement = document.getElementById('reportImprovement');
    const reportAnother = document.getElementById('reportAnother');
    const customMessage = document.getElementById('customMessage');

    // Custom messages based on answers
    const ratingMessages = {
        5: "🤩 Wow! That's awesome!",
        4: "😊 Glad you enjoyed it!",
        3: "🙂 Not bad, we'll do better next time!",
        2: "😐 Oops, I'll try harder.",
        1: "😬 Yikes... I promise to improve!"
    };

    const genreMessages = {
        romcom: "😊 Rom‑Com (sweet & funny)",
        action: "💥 Action (non‑stop excitement!)",
        horror: "👻 Horror (awkward moments galore)",
        fantasy: "🧚 Fantasy (felt like a dream)",
        Areyyy: "😳 Areyyy"
    };

    const anotherDateMessages = {
        yes: "✅ Yes, absolutely!",
        maybe: "🤔 Maybe, if you promise to behave.",
        no: "❌ No, I need a break from your jokes.",
        areyyy: "😳 Areyyy"
    };

    // Walk messages
    const walkMessages = {
        romantic: "💖 Romantic - Holding hands under the stars",
        funny: "😂 Funny - We looked like penguins waddling",
        awkward: "😅 Awkward - Silent but comfortable",
        energetic: "⚡ Energetic - You almost ran me over!",
        perfect: "✨ Perfect - Could have walked forever"
    };

    // Cafe messages
    const cafeMessages = {
        cozy: "🏠 Cozy - Felt like we were in a rom-com",
        funny: "🤣 Funny - Spilled coffee everywhere!",
        romantic: "🌹 Romantic - Candlelight conversations",
        chaotic: "🌀 Chaotic - Too many people, but fun!",
        delicious: "🍰 Delicious - That cake was heavenly!"
    };

    // Helper to get selected radio value
    function getSelectedRadio(name) {
        const selected = document.querySelector(`input[name="${name}"]:checked`);
        return selected ? selected.value : null;
    }

    // Generate a fun final message
    function generateFinalMessage(rating, genre, another, walk, cafe) {
        let base = "Thanks for being awesome! ";
        if (rating === '5' && another === 'yes') {
            base = "You're amazing! Let's do this again soon! ";
        } else if (rating <= '2' && another === 'no') {
            base = "Okay, I'll go cry in a corner... but I'll come back stronger! 💪 ";
        } else if (genre === 'horror') {
            base = "Our date was a horror movie? At least it was memorable! 😂 ";
        } else if (genre === 'fantasy') {
            base = "That was like a fairy tale! 🧚 ";
        } else if (genre === 'Areyyy') {
            base = "Areyyy? That's a new genre! 😳 ";
        } else if (another === 'areyyy') {
            base = "Areyyy... I guess we'll see? 😅 ";
        } else if (walk === 'funny' || cafe === 'funny') {
            base = "Sounds like we had some hilarious moments! 😂 ";
        } else if (walk === 'romantic' && cafe === 'romantic') {
            base = "Wow, so romantic! My heart is melting! 💖 ";
        } else if (walk === 'perfect' || cafe === 'delicious') {
            base = "Perfection! Let's recreate that soon! ✨ ";
        }
        return base + "Hope we can hang out again!";
    }

    // Form submit handler
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        // Gather answers
        const rating = getSelectedRadio('rating');
        const funny = document.getElementById('funnyMoment').value.trim() || "You didn't share a funny moment... that's sad 😢";
        const weird = document.getElementById('weirdMoment').value.trim() || "No weird moments? That's weird! 😅";
        const food = foodSlider.value;
        const walk = getSelectedRadio('walk');
        const cafe = getSelectedRadio('cafe');
        const genre = getSelectedRadio('genre');
        const improvement = document.getElementById('improvement').value.trim() || "Nothing! You were great! 😇";
        const another = getSelectedRadio('anotherDate');

        // Fill report card
        reportRating.textContent = rating ? `${rating}/5` : "—";
        reportFunny.textContent = funny;
        reportWeird.textContent = weird;
        reportFood.textContent = `${food}/10`;
        reportWalk.textContent = walk ? walkMessages[walk] : "—";
        reportCafe.textContent = cafe ? cafeMessages[cafe] : "—";
        reportGenre.textContent = genre ? genreMessages[genre] : "—";
        reportImprovement.textContent = improvement;
        reportAnother.textContent = another ? anotherDateMessages[another] : "—";

        // Show custom message
        const ratingMsg = rating ? ratingMessages[rating] : "No rating given.";
        const genreMsg = genre ? genreMessages[genre] : "";
        const anotherMsg = another ? anotherDateMessages[another] : "";
        const finalMsg = generateFinalMessage(rating, genre, another, walk, cafe);
        customMessage.textContent = finalMsg;

        // Show result, hide form
        form.style.display = 'none';
        resultSection.style.display = 'block';
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Reset button
    resetBtn.addEventListener('click', function() {
        // Reset form
        form.reset();
        foodValue.textContent = '5';
        foodSlider.value = 5;
        // Show form, hide result
        form.style.display = 'block';
        resultSection.style.display = 'none';
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Add some fun effects to options
    const options = document.querySelectorAll('.option');
    options.forEach(opt => {
        opt.addEventListener('click', function() {
            options.forEach(o => o.style.background = '#f8f9fa');
            this.style.background = '#ffeaea';
        });
    });

    // Screenshot functionality
    const screenshotBtn = document.getElementById('screenshotBtn');
    screenshotBtn.addEventListener('click', function() {
        const reportCard = document.querySelector('.report-card');
        
        html2canvas(reportCard, {
            backgroundColor: '#f8f9fa',
            scale: 2,
            useCORS: true
        }).then(canvas => {
            // Convert canvas to image
            const image = canvas.toDataURL('image/png');
            
            // Create a temporary link to download the image
            const link = document.createElement('a');
            link.href = image;
            link.download = 'date-review-report-card.png';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            // Show a success message
            alert('Screenshot saved as "date-review-report-card.png"! 📸');
        }).catch(error => {
            console.error('Error taking screenshot:', error);
            alert('Oops! Could not take screenshot. Please try again.');
        });
    });

    // PDF functionality
    const pdfBtn = document.getElementById('pdfBtn');
    pdfBtn.addEventListener('click', function() {
        const reportCard = document.querySelector('.report-card');
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF('p', 'mm', 'a4');
        
        html2canvas(reportCard, {
            backgroundColor: '#f8f9fa',
            scale: 2,
            useCORS: true
        }).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const imgWidth = 190; // A4 width in mm
            const pageHeight = 280; // A4 height in mm
            const imgHeight = canvas.height * imgWidth / canvas.width;
            
            doc.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
            
            // Add title
            doc.setFontSize(20);
            doc.setTextColor(106, 17, 203);
            doc.text('Date Review Report Card', 105, 20, { align: 'center' });
            
            // Add footer message
            doc.setFontSize(12);
            doc.setTextColor(100, 100, 100);
            doc.text('Please share it with Durga – he\'s eagerly waiting for this! 😊', 105, pageHeight - 10, { align: 'center' });
            
            // Save the PDF
            doc.save('date-review-report.pdf');
            
            // Show success message
            alert('PDF saved as "date-review-report.pdf"! 📄');
        }).catch(error => {
            console.error('Error generating PDF:', error);
            alert('Oops! Could not generate PDF. Please try again.');
        });
    });
});