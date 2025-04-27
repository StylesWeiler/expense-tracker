const xlsx = require('xlsx');
const Expense = require('../models/Expense');

// Add Expense category
exports.addExpense = async (req, res) => {
    const userId = req.user.id;

    try {
        const { icon, category, amount, date } = req.body;

        if (!category || !amount || !date) {
            return res.status(400).json({ message: "All fields are required." });
        }

        // const [year, month, day] = date.split("-");
        // const formattedDate = new Date(Date.UTC(year, month - 1, day));

        const newExpense = new Expense({
            userId,
            icon,
            category,
            amount: parseFloat(amount),
            date: new Date(date + 'T00:00:00'),
        });

        await newExpense.save();
        res.status(200).json(newExpense);
    } catch (error) {
        console.error("Add Expense Error:", error);
        res.status(500).json({ message: "Server error." });
    }
};

// Get all Expense categorys
exports.getAllExpense = async (req, res) => {
    const userId = req.user.id;

    try {
        const expense = await Expense.find({ userId }).sort({ date: -1 });
        res.json(expense);
    } catch (error) {
        console.error("Get All Expense Error:", error);
        res.status(500).json({ message: "Server error." });
    }
};

// Delete Expense category
exports.deleteExpense = async (req, res) => {
    try {
        await Expense.findByIdAndDelete(req.params.id);
        res.json({ message: "Expense deleted successfully." });
    } catch (error) {
        console.error("Delete Expense Error:", error);
        res.status(500).json({ message: "Server error." });
    }
};

// Download Expense as Excel
exports.downloadExpenseExcel = async (req, res) => {
    const userId = req.user.id;

    try {
        const expense = await Expense.find({ userId }).sort({ date: -1 });

        const data = expense.map((item) => ({
            category: item.category,
            Amount: item.amount,
            Date: item.date.toISOString().split('T')[0], // format date nicely
        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Expense");

        // Write workbook to a buffer
        const buffer = xlsx.write(wb, { type: 'buffer', bookType: 'xlsx' });

        res.setHeader('Content-Disposition', 'attachment; filename=expense_details.xlsx');
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.send(buffer);
    } catch (error) {
        console.error("Download Expense Excel Error:", error);
        res.status(500).json({ message: "Server error." });
    }
};
