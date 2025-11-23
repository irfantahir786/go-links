 <div className="max-w-3xl mx-auto">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
              <div className="space-y-4">
                {/* Long URL Input */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-400 mb-2">Paste your long URL</label>
                  <div className="relative">
                    <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                    <input
                      type="url"
                      value={longUrl}
                      onChange={(e) => setLongUrl(e.target.value)}
                      placeholder="https://example.com/very/long/url/that/needs/shortening"
                      className="w-full bg-white/10 border border-white/20 rounded-xl pl-12 pr-4 py-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    />
                  </div>
                </div>

                {/* Custom Code Input */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Custom short code <span className="text-gray-600">(optional)</span>
                  </label>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center bg-white/10 border border-white/20 rounded-xl px-4 py-4 text-gray-400">
                      <span>short.ly/</span>
                    </div>
                    <div className="relative flex-1">
                      <Sparkles className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                      <input
                        type="text"
                        value={customCode}
                        onChange={handleCustomCodeChange}
                        placeholder="my-custom-link"
                        className={`w-full bg-white/10 border rounded-xl pl-12 pr-12 py-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition ${getInputBorderClass()}`}
                      />
                      {/* Status indicator */}
                      <div className="absolute right-4 top-1/2 -translate-y-1/2">
                        {checkingCode ? (
                          <div className="w-5 h-5 border-2 border-blue-400/30 border-t-blue-400 rounded-full animate-spin" />
                        ) : customCode.length >= 3 && codeAvailable === true ? (
                          <div className="flex items-center justify-center w-6 h-6 bg-green-500 rounded-full">
                            <Check size={14} className="text-white" />
                          </div>
                        ) : customCode.length >= 3 && codeAvailable === false ? (
                          <div className="flex items-center justify-center w-6 h-6 bg-red-500 rounded-full">
                            <X size={14} className="text-white" />
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>

                  {/* Availability message */}
                  <div className="mt-2 min-h-[24px]">
                    {checkingCode ? (
                      <p className="text-sm text-blue-400 flex items-center gap-2">
                        <span className="inline-block w-1 h-1 bg-blue-400 rounded-full animate-pulse" />
                        Checking availability...
                      </p>
                    ) : customCode.length >= 3 && codeAvailable === true ? (
                      <p className="text-sm text-green-400 flex items-center gap-2">
                        <Check size={14} />
                        Great! &quot;{customCode}&quot; is available
                      </p>
                    ) : customCode.length >= 3 && codeAvailable === false ? (
                      <p className="text-sm text-red-400 flex items-center gap-2">
                        <X size={14} />
                        Sorry, &quot;{customCode}&quot; is already taken. Try another one.
                      </p>
                    ) : customCode.length > 0 && customCode.length < 3 ? (
                      <p className="text-sm text-gray-500">Enter at least 3 characters to check availability</p>
                    ) : (
                      <p className="text-xs text-gray-500">
                        Leave empty for auto-generated code. Only letters, numbers, hyphens and underscores allowed.
                      </p>
                    )}
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="bg-red-500/20 border border-red-500/50 text-red-300 px-4 py-3 rounded-xl text-sm flex items-center gap-2">
                    <X size={16} />
                    {error}
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="button"
                  onClick={handleShorten}
                  disabled={isSubmitDisabled()}
                  className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white font-semibold py-4 rounded-xl transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Creating Short Link...
                    </>
                  ) : (
                    <>
                      <Zap size={20} />
                      Shorten URL
                    </>
                  )}
                </button>
              </div>

              {/* Result */}
              {shortUrl && (
                <div className="mt-6 p-5 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-2xl">
                  <div className="flex items-center gap-2 text-green-400 mb-3">
                    <Check size={20} />
                    <span className="font-medium">Your short link is ready!</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 bg-white/10 rounded-xl px-4 py-3 font-mono text-lg text-white truncate">
                      {shortUrl}
                    </div>
                    <button
                      onClick={copyToClipboard}
                      className={`p-3 rounded-xl transition-all ${copied ? 'bg-green-500 text-white' : 'bg-white/10 hover:bg-white/20 text-gray-300'
                        }`}
                      title="Copy to clipboard"
                    >
                      {copied ? <Check size={20} /> : <Copy size={20} />}
                    </button>
                    <a
                      href={shortUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-white/10 hover:bg-white/20 rounded-xl transition text-gray-300"
                      title="Open link"
                    >
                      <ExternalLink size={20} />
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>