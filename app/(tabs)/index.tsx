import React, { useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Transaction {
  id: number;
  type: 'sent' | 'received';
  amount: number;
  user: string;
  date: string;
}

const HomePage: React.FC = () => {
  const [balance, setBalance] = useState<number>(1234.56);
  const [amount, setAmount] = useState<string>('');
  const [recipient, setRecipient] = useState<string>('');

  const transactions: Transaction[] = [
    { id: 1, type: 'sent', amount: 50.00, user: 'John Doe', date: '2024-12-30' },
    { id: 2, type: 'received', amount: 25.00, user: 'Jane Smith', date: '2024-12-29' },
    { id: 3, type: 'sent', amount: 15.00, user: 'Mike Johnson', date: '2024-12-28' },
  ];

  const handleSendMoney = () => {
    if (amount && recipient) {
      setBalance(prev => prev - parseFloat(amount));
      setAmount('');
      setRecipient('');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Balance Card */}
        <View style={styles.balanceCard}>
          <View style={styles.balanceHeader}>
            <Ionicons name="wallet-outline" size={24} color="white" />
            <Text style={styles.balanceLabel}>Available Balance</Text>
          </View>
          <Text style={styles.balanceAmount}>${balance.toFixed(2)}</Text>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="send-outline" size={24} color="#007AFF" />
            <Text style={styles.actionText}>Send</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="card-outline" size={24} color="#007AFF" />
            <Text style={styles.actionText}>Pay</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="qr-code-outline" size={24} color="#007AFF" />
            <Text style={styles.actionText}>Scan</Text>
          </TouchableOpacity>
        </View>

        {/* Send Money Section */}
        <View style={styles.sendMoneySection}>
          <Text style={styles.sectionTitle}>Send Money</Text>
          <TextInput
            style={styles.input}
            placeholder="Recipient's email or username"
            value={recipient}
            onChangeText={setRecipient}
          />
          <TextInput
            style={styles.input}
            placeholder="Amount"
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
          />
          <TouchableOpacity 
            style={[
              styles.sendButton,
              (!amount || !recipient) && styles.sendButtonDisabled
            ]}
            onPress={handleSendMoney}
            disabled={!amount || !recipient}
          >
            <Text style={styles.sendButtonText}>Send Money</Text>
          </TouchableOpacity>
        </View>

        {/* Recent Transactions */}
        <View style={styles.transactionsSection}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          {transactions.map(transaction => (
            <View key={transaction.id} style={styles.transactionItem}>
              <View style={styles.transactionInfo}>
                <Ionicons 
                  name={transaction.type === 'received' ? 'arrow-down-outline' : 'arrow-up-outline'} 
                  size={24} 
                  color={transaction.type === 'received' ? '#34C759' : '#FF3B30'} 
                />
                <View style={styles.transactionDetails}>
                  <Text style={styles.transactionUser}>{transaction.user}</Text>
                  <Text style={styles.transactionDate}>{transaction.date}</Text>
                </View>
              </View>
              <Text style={[
                styles.transactionAmount,
                { color: transaction.type === 'received' ? '#34C759' : '#FF3B30' }
              ]}>
                {transaction.type === 'received' ? '+' : '-'}${transaction.amount.toFixed(2)}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  scrollView: {
    flex: 1,
  },
  balanceCard: {
    backgroundColor: '#007AFF',
    padding: 20,
    margin: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  balanceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  balanceLabel: {
    color: 'white',
    marginLeft: 8,
    fontSize: 16,
  },
  balanceAmount: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    backgroundColor: 'white',
    marginHorizontal: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  actionButton: {
    alignItems: 'center',
  },
  actionText: {
    marginTop: 4,
    color: '#007AFF',
  },
  sendMoneySection: {
    backgroundColor: 'white',
    padding: 16,
    marginHorizontal: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E5E5EA',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  sendButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: '#A2A2A2',
  },
  sendButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  transactionsSection: {
    backgroundColor: 'white',
    padding: 16,
    marginHorizontal: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  transactionInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  transactionDetails: {
    marginLeft: 12,
  },
  transactionUser: {
    fontSize: 16,
    fontWeight: '500',
  },
  transactionDate: {
    color: '#8E8E93',
    fontSize: 14,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: '500',
  },
});

export default HomePage;