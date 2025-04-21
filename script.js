// zakat-calculator.js

const nisab = {
    bulanan: 7140498,
    tahunan: 85685972
  };
  
  // Format input angka jadi rupiah + tetap jaga posisi kursor
  function formatRupiah(input) {
    const selectionStart = input.selectionStart;
    const originalLength = input.value.length;
  
    let value = input.value.replace(/\D/g, '');
    if (!value) {
      input.value = '';
      return;
    }
  
    const formatted = new Intl.NumberFormat('id-ID').format(value);
    input.value = formatted;
  
    const newLength = formatted.length;
    const lengthDiff = newLength - originalLength;
    const newPos = selectionStart + lengthDiff;
  
    input.setSelectionRange(newPos, newPos);
  }
  
  // Event listener setelah DOM siap
  document.addEventListener("DOMContentLoaded", function () {
    const periodSelect = document.getElementById("period");
    const incomeInput = document.getElementById("income");
    const extraInput = document.getElementById("extraIncome");
  
    periodSelect.addEventListener("change", function () {
      const selected = this.value;
      document.getElementById("labelPeriode").innerText = selected === "tahunan" ? "per Tahun" : "per Bulan";
    });
  
    incomeInput.addEventListener("input", function () {
      formatRupiah(this);
    });
  
    extraInput.addEventListener("input", function () {
      formatRupiah(this);
    });
  });
  
  // Fungsi utama hitung zakat
  function hitungZakat() {
    const period = document.getElementById("period").value;
    const hasilDiv = document.getElementById("hasilZakat");
  
    const incomeRaw = document.getElementById("income").value.replace(/\./g, '');
    const extraRaw = document.getElementById("extraIncome").value.replace(/\./g, '') || '0';
  
    const income = parseInt(incomeRaw, 10);
    const extraIncome = parseInt(extraRaw, 10);
    const totalIncome = income + extraIncome;
    const ambangNisab = nisab[period];
  
    if (isNaN(income) || income <= 0) {
      hasilDiv.innerHTML = "Silakan masukkan penghasilan utama yang valid.";
      return;
    }
  
    if (totalIncome >= ambangNisab) {
      const zakat = totalIncome * 0.025;
      hasilDiv.innerHTML = `✅ Wajib Zakat<br>
        Total Penghasilan: <strong>Rp ${totalIncome.toLocaleString('id-ID')}</strong><br>
        Zakat yang harus dibayarkan: <strong>Rp ${zakat.toLocaleString('id-ID')}</strong>`;
    } else {
      hasilDiv.innerHTML = `❌ Tidak Wajib Zakat<br>
        Total Penghasilan: <strong>Rp ${totalIncome.toLocaleString('id-ID')}</strong><br>
        Penghasilan Anda di bawah nisab:<br> ${period === 'tahunan' ? '<strong>Rp 85.685.972</strong>' : '<strong>Rp 7.140.498</strong>'}.`;
    }
  }
  