// Last updated: Nov 10, 2021
// Comment convention:
// 🚀 - rocket indicates Stellar code
// 🌎 - globe indicates UI/React related code

// 🌎 Imports in the file
import React from "react";
import StellarSdk from "stellar-sdk";
// UI elements
import { Layout, Heading4 } from "@stellar/design-system";
// Modals
import { SignOutModal } from "../../components/wallet/SignOutModal";
// Views
import { Account } from "../../views/Account";
import { Intro } from "../../views/Intro";
import { Transactions } from "../../views/Transactions";
import { People } from "../../views/People";
// Methods
import { createKeystore } from "../../methods/createKeystore";
import { fetchAccount } from "../../methods/fetchAccounts";
// Services
import {
  getStorageItem,
  setStorageItem,
  removeStorageItem
} from "../../services/storage";
// Types

// Styles
import Paperbase from "../../components/layout/Paperbase";
import Header from '../../components/layout/Header'

// 🌎 Setting constants here
const STORAGE_KEY = "app-example-account-key";

const Wallet = () => {
  // 🌎 Handling React local state (state variables and setter functions)
  const [accountKeys, setAccountKeys] = React.useState(
    null
  );
  const [accountData, setAccountData] = React.useState(
    null
  );
  const [isUiUpdating, setIsUiUpdating] = React.useState(false);
  const [isUpdatingAccount, setIsUpdatingAccount] = React.useState(false);
  const [signOutModalVisible, setSignOutModalVisible] = React.useState(false);

  // 🌎 Assigning to variable here for more convenient usage
  const publicKey = accountKeys?.publicKey;

  // 🌎 On the first page load, using React `useEffect` hook, check if there is
  // account stored in local storage.
  React.useEffect(() => {
    const savedAccountInfo = getStorageItem(STORAGE_KEY);

    // 🌎 If there is an account in local storage, save it in local state
    if (savedAccountInfo) {
      const { publicKey, keystore } = JSON.parse(savedAccountInfo);
      // 🚀 Setting Stellar public key and encrypted keystore to local state
      // More about public key and keystore in `/methods/createKeystore.ts`
      setAccountKeys({
        publicKey,
        keystore
      });
      // 🌎 Trigger to fetch the account data, handled in `React.useEffect` hook
      // below
      setIsUpdatingAccount(true);
    }
  }, []);

  // 🌎 Using React `useEffect` hook, fetch account data (initial load or
  // update)
  React.useEffect(() => {
    const fetchAccountData = async () => {
      if (isUpdatingAccount && publicKey) {
        // 🚀 Fetch Stellar account data using `stellar-sdk`
        const data = await fetchAccount(publicKey);
        // 🌎 Update local state
        setAccountData(data);
        setIsUpdatingAccount(false);
      }
    };

    fetchAccountData();
  }, [isUpdatingAccount, publicKey]);

  const handleAccountInfo = (accountInfo) => {
    // 🌎 Update local state
    setIsUiUpdating(false);
    setAccountKeys(accountInfo);
    setIsUpdatingAccount(true);
    // 🌎 Save public key and encrypted keystore in browser’s local storage
    setStorageItem(STORAGE_KEY, JSON.stringify(accountInfo));
  };

  const createAndSetAccount = async (pincode) => {
    // 🌎 Update state to show loading state
    setIsUiUpdating(true);
    // 🚀 Generate new keypair on Stellar test network
    const keypair = StellarSdk.Keypair.random();
    // 🌎 Save encrypted secret key to keystore
    const accountInfo = createKeystore(keypair, pincode);

    try {
      // 🚀 After new keypair is generated, we need to fund the account to make
      // it active. We’re using Stellar’s testnet friendbot to do that.
      await fetch(
        `https://friendbot.stellar.org?addr=${accountInfo.publicKey}`
      );
      // 🌎 Update local state and save data in local storage
      handleAccountInfo(accountInfo);
    } catch (e) {
      // 🌎 Handle error here
    }
  };

  const signInWithSecretKey = (secretKey, pincode) => {
    // 🌎 Update state to show loading state
    setIsUiUpdating(true);
    // 🚀 Create keypair from secret key on Stellar test network
    const keypair = StellarSdk.Keypair.fromSecret(secretKey);
    // 🌎 Save encrypted secret key to keystore
    const accountInfo = createKeystore(keypair, pincode);
    // 🌎 Update local state and save data in local storage
    handleAccountInfo(accountInfo);
  };

  const signOut = () => {
    // 🌎 Sign out by clearing the state and removing saved account from local
    // storage
    setAccountKeys(null);
    removeStorageItem(STORAGE_KEY);
  };

  const conditionalSignOutAction = () => {
    // 🌎 If on the `Account` view, show the `Sign out` link
    if (accountKeys) {
      return () => setSignOutModalVisible(true);
    }

    // 🌎 Don’t show `Sign out` link on the `Intro` view
    return undefined;
  };

  const [value, setValue] = React.useState(0);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleWallet = () => {
    setValue(0)
  }

  const handleTransactions = () => {
    setValue(1)
  }

  const handlePeople = () => {
    setValue(2)
  }

  // 🌎 Only UI related code below. More details will be in each view.
  return (
    <>
      {/* 🌎 Header component */}
        {/* <Layout.Header
          projectTitle="Lumen Pay"
          // 🌎 Conditionally render `Sign out` link (if there is no action, the
          // link will not be rendered)
          onSignOut={conditionalSignOutAction()}
          // 🌎 Enable dark mode toggle in the header
          hasDarkModeToggle
        /> */}

      <Layout.Content>
        {/* <Layout.Inset> */}
          {accountKeys ? (
            // 🌎 Render account view, if there is account info
            <>
              <Paperbase 
                Header = {
                  <Header 
                    onDrawerToggle={handleDrawerToggle} 
                    value={value} 
                    handleWallet={handleWallet}
                    handleTransactions={handleTransactions}
                    handlePeople={handlePeople}
                  />
                }
                content = {
                  value == 0 ? (
                    <Account
                      accountKeys={accountKeys}
                      accountData={accountData}
                      refreshAccount={() => setIsUpdatingAccount(true)}
                      signout={conditionalSignOutAction()}
                    />
                  ): value == 1 ?(
                    <Transactions />

                  ) : (
                    <People />
                  )
                  
                }
              />
          </>
          ) : (
            // 🌎 Render create account view, if there is no account info yet
            <Intro
              createAndSetAccount={createAndSetAccount}
              signInWithSecretKey={signInWithSecretKey}
              isUiUpdating={isUiUpdating}
            />
          )}
        {/* </Layout.Inset> */}
      </Layout.Content>

      {/* Modals */}
      <SignOutModal
        visible={signOutModalVisible}
        onClose={() => setSignOutModalVisible(false)}
        onDone={signOut}
      />
    </>
  );
};

export default Wallet;
