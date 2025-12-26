export const Footer = () => {
  return (
    <div className="bg-indigo-700 pb-10">
      <div className="flex-flex-col pl-5 h-13">
        <div className="flex">
          <img src="/film tsagaan.png" alt="" className="w-5 h-5" />
          <p className="text-white md:text-indigo-700 font-bold pt-10 text-base">
            Movie Z
          </p>
        </div>
        <p className="text-white">© 2024 Movie Z. All Rights Reserved.</p>
      </div>
      <div className="flex w-83.75 h-37 pl-5 text-white justify-between pt-7">
        <div className="flex flex-col gap-y-3">
          <div>Contact Information</div>
          <div className="flex flex-col gap-y-6">
            <div className="flex items-center gap-x-3">
              <img src="./Wifi icon.png" alt="" className="w-4 h-4" />
              <div className="flex-flex-col">
                <p>Email:</p>
                <p>support@movieZ.com</p>
              </div>
            </div>

            <div className="flex items-center gap-x-3 ">
              <img src="./phoneicon.png" alt="" className="w-4 h-4" />
              <div className="flex flex-col">
                <p>Phone:</p>
                <p>+976 (11) 123-4567</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col text-white">
          <button>Follow us</button>
          <button>Facebook</button>
          <button>Instagram</button>
          <button>Twitter</button>
          <button>Youtube</button>
        </div>
      </div>
    </div>
  );
};
